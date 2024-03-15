<template>
    <h1 class="text-2xl font-bold">
        Habis Pakai
    </h1>
    <UBreadcrumb divider="/"
        :links="[{ label: 'Home', to: '/dashboard' }, { label: 'habis pakai', to: '/dashboard/habis-pakai' }]" />

    <div class="my-4">
        <ClientOnly>
            <UButton @click="isOpen = true">
                <UIcon name="i-material-symbols:add" dynamic></UIcon>
                tambahkan peralatan
            </UButton>
            <UTable :rows="rows" :columns="columns" :loading="pending">
                <template #actions-data="{ row }">
                    <UDropdown :items="items(row)">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                </template>
            </UTable>
            <template #fallback>
                <USkeleton class="w-full h-64" />
            </template>
            
        </ClientOnly>
    </div>


    <UModal v-model="isOpen">
        <ClientOnly>
            <UForm :schema="schema" :state="state" class="space-y-4 m-4" @submit="onSubmit">
                <UFormGroup label="Nama Peralatan" name="nama">
                    <UInput v-model="state.nama" />
                </UFormGroup>

                <UFormGroup label="Keterangan" name="keterangan">
                    <UInput v-model="state.keterangan" />
                </UFormGroup>

                <UFormGroup label="Kuantitas" name="kuantitas">
                    <UInput v-model="state.kuantitas" type="number" />
                </UFormGroup>

                <UFormGroup label="Satuan" name="satuan">
                    <UInputMenu v-model="state.satuan" :options="['unit']" />
                </UFormGroup>

                <UFormGroup label="harga" name="harga">
                    <UInput v-model="state.harga" type="number" />
                </UFormGroup>

                <UButton :disabled="isSubmit" type="submit" class="w-full justify-center">
                    <template v-if="isSubmit">
                        <UIcon name="i-eos-icons-loading" /> Please wait...
                    </template>
                    <template v-else>
                        Submit
                    </template>
                </UButton>

            </UForm>
            <template #fallback>
                <USkeleton />
            </template>
        </ClientOnly>
    </UModal>
</template>

<script setup lang="ts">
import z from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import axios from 'axios'

// @ts-ignore
const items = (row) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row)
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid'
    }]
]

const schema = z.object({
    nama: z.string(),
    keterangan: z.string(),
    kuantitas: z.number(),
    satuan: z.string(),
    harga: z.number(),
})

type Schema = z.output<typeof schema>

const state = reactive({
    nama: undefined,
    keterangan: undefined,
    kuantitas: undefined,
    satuan: 'unit',
    harga: undefined,
})

const isSubmit = ref(false)
async function onSubmit(event: FormSubmitEvent<any>) {
    isSubmit.value = true
    const submitData = event.data

    axios.post('/api/peralatan', submitData).then(e => e.data)
        .then(async e => {
            toastSuccess('success menambambahkan data')
            await new Promise(r => setTimeout(r, 1500))
            refresh()
            isOpen.value = false
        })
        .catch(e => {
            console.log(e)
            const error = e?.response?.data?.message ?? 'An unknown error occurred.'
            toastError(error)
        }).finally(() => { isSubmit.value = false })

}

const { data: rows, pending, refresh } = await useLazyFetch(() =>
    `/api/peralatan`
)
const isOpen = ref(false)


definePageMeta({
    layout: 'dashboard'
})
useHead({
    title: 'habis pakai'
})

const columns = [
    {
        key: 'no',
        label: 'No',
        sortable: true
    }, {
        key: 'nama',
        label: 'Pembelian Peralatan',
        sortable: true
    },
    {
        key: 'keterangan',
        label: 'Keterangan',
    },
    {
        key: 'kuantitas',
        label: 'Kuantitas',
    },
    {
        key: 'satuan',
        label: 'Satuan',
    },
    {
        key: 'harga',
        label: 'Harga',
        sortable: true
    },
    {
        key: 'jumlah',
        label: 'Jumlah',
        sortable: true
    },
    {
        key: 'actions'
    }
]


</script>