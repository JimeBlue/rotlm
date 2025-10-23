<template>
  <div>
    <div class="flex justify-between py-3.5">
      <UInput
        v-model="globalFilter"
        placeholder="Filter people..."
        icon="i-heroicons-magnifying-glass-20-solid"
        autocomplete="off"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template v-if="globalFilter !== ''" #trailing>
          <UButton
            color="gray"
            variant="link"
            icon="i-lucide-x"
            :padded="false"
            @click="globalFilter = ''"
          />
        </template>
      </UInput>

      <UButton :loading="loading" @click="fetchAllGuests">
        {{ loading ? 'Fetching...' : 'Fetch All Data' }}
      </UButton>
    </div>

    <UTable
      v-model:global-filter="globalFilter"
      :data="guests"
      :columns="columns"
      :loading
      class="flex-1 h-80 lg:h-[600px] border-gray-200 border-y overscroll-contain"
      sticky
    >
      <template #avatar-cell="{ row }">
        <UAvatar
          :src="row.original.files.length && row.original.files[0].original_url || null"
          size="lg"
          :alt="row.original.contact.full_name"
        />
      </template>

      <template #status-cell="{ row }">
        <UBadge
          size="md"
          class="grid w-full text-center uppercase"
          :label="t(`status.${row.original.status}`)"
          :color="statusColors[row.original.status]"
          variant="subtle"
        />
      </template>

      <template #actions-cell="{ row }">
        <div class="flex">
          <UButton
            size="sm"
            class="ml-auto"
            variant="ghost"
            icon="i-lucide-pencil"
            @click="selectGuest(row)"
          >
            Edit
          </UButton>
        </div>
      </template>
    </UTable>

    <UModal
      v-model:open="showEditModal"
      :ui="{ content: 'w-full lg:max-w-4xl' }"
      title="Edit Guest"
      description="Remember to click save"
      :dismissible="false"
    >
      <template #body>
        <FormsSingleGuest v-if="selectedGuest" :guest="selectedGuest" @close="close" />
      </template>
    </UModal>
  </div>
</template>

<script setup>
const { t } = useI18n()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const code = user.value.code
const { loading, guests, fetchAllGuests } = usePaginatedGuests(code)

const globalFilter = ref('')

const selectedGuest = ref(null)

const showEditModal = ref(false)
const editModal = useConfirmDialog(showEditModal)

onMounted(() => {
  if (code) { fetchAllGuests() }
})

function selectGuest(guest) {
  selectedGuest.value = guest.original
  editModal.reveal()
}

editModal.onCancel(() => {
  setTimeout(() => { selectedGuest.value = null }, 210)
})

function close() {
  editModal.cancel()
  fetchAllGuests()
}

const columns = [
  {
    accessorKey: 'avatar',
    header: '',
  },
  {
    id: 'contact.full_name',
    accessorKey: 'contact.full_name',
    header: 'Name',
    sortable: true,
    cell: ({ row }) => row.original.contact?.full_name || '',
  },
  {
    id: 'contact.company_name',
    accessorKey: 'contact.company_name',
    header: 'Company Name',
    sortable: true,
    cell: ({ row }) => row.original.contact?.company_name || '',
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    sortable: true,
    class: 'w-[78px]',
    cell: ({ row }) => row.original.status,
  },
  {
    key: 'actions',
    id: 'actions',
    header: '',
    class: 'w-[110px]',
    cell: ({ row }) => '',
  },
]

const statusColors = {
  cancelled: 'error',
  requested: 'warning',
  listed: 'neutral',
  confirmed: 'success',
  invited: 'info',
}
</script>
