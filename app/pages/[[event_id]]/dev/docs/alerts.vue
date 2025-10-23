<template>
  <div>
    <BaseHero />
    <section>
      <div class="container">
        <div class="flex gap-6">
          <UButton color="success" @click="successModal">
            Success
          </UButton>
          <UButton @click="loadingModal">
            Loading
          </UButton>
          <UButton color="error" @click="errorModal">
            Error
          </UButton>
          <UButton color="info" @click="infoModal">
            Info
          </UButton>
          <UButton color="error" @click="namedAlert('incomplete', 'error')">
            Named Alert
          </UButton>
          <UButton color="warning" @click="confirmDialog">
            Confirm Dialog
          </UButton>
          <UButton color="primary" @click="threeButtonDialog">
            Three Buttons
          </UButton>

          <!-- TODO : If nested modals close - be able to close this one directly too -->
          <UModal title="Modal with title">
            <UButton label="Open" color="neutral" class="ml-auto" />

            <template #body>
              <div class="h-48" />
            </template>

            <template #footer>
              <UButton @click="loadingModal">
                Loading
              </UButton>
            </template>
          </UModal>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { Alert, namedAlert } = useAlert()

async function loadingModal() {
  Alert({
    title: 'Loading',
    icon: 'loading',
    showConfirmButton: false,
  })

  setTimeout(async () => {
    await successModal()
  }, 2000)
}

async function successModal() {
  await Alert({
    title: 'Success',
    icon: 'success',
  })
}

async function infoModal() {
  await Alert({
    title: 'Info',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nemo rerum eligendi suscipit, tenetur ut vitae voluptate dicta reprehenderit facilis nam, eos, mollitia earum adipisci cum! Ipsum sint placeat adipisci?',
    icon: 'info',
  })
}

async function errorModal() {
  await Alert({
    title: 'Missing Data',
    text: 'Please fill in all required fields.',
    icon: 'error',
  })
}

// New SweetAlert2-style dialogs
async function confirmDialog() {
  const result = await Alert({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    confirmButtonColor: 'error',
    reverseButtons: true,
  })

  if (result.isConfirmed) {
    Alert({
      title: 'Deleted!',
      text: 'Your file has been deleted.',
      icon: 'success',
    })
  }
  else if (result.isDismissed) {
    Alert({
      title: 'Cancelled',
      text: 'Your file is safe :)',
      icon: 'info',
    })
  }
}

async function threeButtonDialog() {
  const result = await Alert({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: 'Don\'t save',
    cancelButtonText: 'Cancel',
  })

  if (result.isConfirmed) {
    Alert({ title: 'Saved!', icon: 'success' })
  }
  else if (result.isDenied) {
    Alert({ title: 'Changes are not saved', icon: 'info' })
  }
}
</script>
