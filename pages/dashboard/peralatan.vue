<template>
    <h1 class="text-2xl font-bold">
        Peralatan
    </h1>
    <UBreadcrumb divider="/"
        :links="[{ label: 'Home', to: '/dashboard' }, { label: 'Peralatan', to: '/dashboard/peralatan' }]" />

    <div class="my-4">
        <ClientOnly>
            <div class="flex gap-x-4">
                <UButton @click="{; stateReset(); isOpen = true}">
                    <UIcon name="i-material-symbols:add" dynamic></UIcon>
                    tambahkan peralatan
                </UButton>
                <UButton color="gray" class="cursor-default">
                    Total: {{total}}
                </UButton>
            </div>
            <UTable :rows="rows" :columns="columns" :loading="pending">
                <template #jumlah-data="{ row }">
                    {{ formatNumber(row.jumlah) }}
                </template>
                <template #harga-data="{ row }">
                    {{ formatNumber(row.harga) }}
                </template>
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

    <!-- delete -->
    <UModal v-model="isDelete" :prevent-close="isSubmit">
        <ClientOnly>
            <UForm :schema="schema" :state="state" class="space-y-4 m-4" @submit="onDelete">
                <UFormGroup label="Nama Peralatan" name="nama">
                    <UInput v-model="state.nama" disabled />
                </UFormGroup>

                <UFormGroup label="Keterangan" name="keterangan">
                    <UInput v-model="state.keterangan" disabled />
                </UFormGroup>

                <UFormGroup label="Kuantitas" name="kuantitas">
                    <UInput v-model="state.kuantitas" type="number" disabled />
                </UFormGroup>

                <UFormGroup label="Satuan" name="satuan">
                    <UInputMenu v-model="state.satuan" :options="['unit']" disabled />
                </UFormGroup>

                <UFormGroup label="harga" name="harga">
                    <UInput v-model="state.harga" type="number" disabled />
                </UFormGroup>

                <UButton :disabled="isSubmit" type="submit" class="w-full justify-center" color="red">
                    <template v-if="isSubmit">
                        <UIcon name="i-eos-icons-loading" /> Please wait...
                    </template>
                    <template v-else>
                        Delete
                    </template>
                </UButton>
            </UForm>
            <template #fallback>
                <USkeleton />
            </template>
        </ClientOnly>
    </UModal>

    <!-- edit/add -->
    <UModal v-model="isOpen" :prevent-close="isSubmit">
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

// @ts-ignore
const items = (row) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => {
            state.nama = row.nama
            state.id = row.id
            state.keterangan = row.keterangan
            state.satuan = row.satuan
            state.harga = Number(row.harga)
            state.kuantitas = Number(row.kuantitas)
            isOpen.value = true
        }
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => {
            state.id = row.id
            state.no = row.no
            state.nama = row.nama
            state.keterangan = row.keterangan
            state.satuan = row.satuan
            state.harga = Number(row.harga)
            state.kuantitas = Number(row.kuantitas)
            isDelete.value = true
        }
    }]
]

const isDelete = ref(false)

const schema = z.object({
    nama: z.string(),
    keterangan: z.string(),
    kuantitas: z.number(),
    satuan: z.string(),
    harga: z.number(),
})

type Schema = z.output<typeof schema>
const total = ref(0)
const state = reactive({
    no: '',
    id: '',
    nama: '',
    keterangan: '',
    kuantitas: 0,
    satuan: 'unit',
    harga: 0,
})
const stateReset = () => {
    state.nama = ''
    state.id = ''
    state.no = ''
    state.keterangan = ''
    state.satuan = ''
    state.harga = 0
    state.kuantitas = 0
}

const isSubmit = ref(false)
async function onDelete(event: FormSubmitEvent<any>) {
    isSubmit.value = true
    const submitData = event.data

    $fetch('/api/peralatan', {
        method: 'delete',
        body: submitData
    })
        .then(async e => {
            console.log(e)
            toastSuccess('success menghapus data')
            refresh()
            isDelete.value = false
        })
        .catch(e => {
            console.log(e)
            const error = e?.response?.data?.message ?? 'An unknown error occurred.'
            toastError(error)
        }).finally(() => {
            isSubmit.value = false
            stateReset()
        })
}

async function onSubmit(event: FormSubmitEvent<any>) {
    isSubmit.value = true
    const submitData = event.data
    const method = submitData.id ? 'put' : 'post'
    console.log(method)

    $fetch('/api/peralatan', {
        method: method,
        body: submitData
    })
        .then(async e => {
            toastSuccess(e.message)
            refresh()
            isOpen.value = false
        })
        .catch(e => {
            console.log(e)
            const error = e?.response?.data?.message ?? 'An unknown error occurred.'
            toastError(error)
        }).finally(() => {
            isSubmit.value = false
            stateReset()
        })
}

const { data: rows, pending, refresh } = await useLazyFetch(() =>
    `/api/peralatan`
)

watch(rows, (e)=>{
    let d =0
    e?.forEach(j=>{
        d += j.jumlah
    })
    // @ts-ignore
    total.value = formatNumber(d)
})
const isOpen = ref(false)


definePageMeta({
    layout: 'dashboard'
})
useHead({
    title: 'peralatan'
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