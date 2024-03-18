<template>
    <h1 class="text-2xl font-bold">
        Habis Pakai
    </h1>
    <UBreadcrumb divider="/"
        :links="[{ label: 'Home', to: '/dashboard' }, { label: 'Habis Pakai', to: '/dashboard/habis-pakai' }]" />

    <div class="my-4">
        <ClientOnly>
            <div class="flex flex-col gap-y-4 my-2">
                <div class="flex gap-x-4">
                    <UButton @click="{ ; stateReset(); isOpen = true }" icon="i-material-symbols:add">
                        tambahkan habis pakai
                    </UButton>
                    <UButton color="gray" class="cursor-default">
                        Total: {{ rows?.total }}
                    </UButton>
                </div>
                <div class="flex gap-x-4">
                    <UButton icon="i-heroicons-pencil-square-20-solid"  @click="isOpenKapasitas = true" :disabled="pending_kapasitas">
                        Edit Kapasitas Perbulan
                    </UButton>
                    <UButton color="gray" class="cursor-default">
                        Kapasitas Produksi Perbulan: {{ kapasitas_produksi?.kapasitas }}
                    </UButton>
                </div>
            </div>
            <UTable :rows="rows?.data" :columns="columns" :loading="pending">
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

    <!-- kapasitas produksi -->
    <UModal v-model="isOpenKapasitas" :prevent-close="isSubmit">
        <ClientOnly>
            <UForm  :state="stateKapasitas" class="space-y-4 m-4" @submit="onSubmitKapasitas">
                <UFormGroup label="Kuantitas" name="kuantitas">
                    <UInput v-model="stateKapasitas.kapasitas_produksi" type="number"/>
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

    <!-- delete -->
    <UModal v-model="isDelete" :prevent-close="isSubmit">
        <ClientOnly>
            <UForm :schema="schema" :state="state" class="space-y-4 m-4" @submit="onDelete">
                <UFormGroup label="Nama Bahan Habis Pakai" name="nama">
                    <UInput v-model="state.nama" disabled />
                </UFormGroup>

                <UFormGroup label="Keterangan" name="keterangan">
                    <UInput v-model="state.keterangan" disabled />
                </UFormGroup>

                <UFormGroup label="Kuantitas" name="kuantitas">
                    <UInput v-model="state.kuantitas" type="number" disabled />
                </UFormGroup>

                <UFormGroup label="Satuan" name="satuan">
                    <UInputMenu v-model="state.satuan" :options="satuanOptions" disabled />
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
                <UFormGroup label="Nama Bahan Habis Pakai" name="nama">
                    <UInput v-model="state.nama" />
                </UFormGroup>

                <UFormGroup label="Keterangan" name="keterangan">
                    <UInput v-model="state.keterangan" />
                </UFormGroup>

                <UFormGroup label="Kuantitas" name="kuantitas">
                    <UInput v-model="state.kuantitas" type="number" />
                </UFormGroup>

                <UFormGroup label="Satuan" name="satuan">
                    <USelectMenu v-model="state.satuan" :options="satuanOptions" />
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

const { data: rows, pending, refresh } = await useLazyFetch(() =>
    `/api/habis-pakai`
)
const { data: kapasitas_produksi, pending: pending_kapasitas, refresh: refresh_kapasitas } = await useLazyFetch(() =>
    `/api/kapasitas-produksi`
)

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

// @ts-ignore
const isOpenKapasitas = ref(false)

const satuanOptions = ['unit', 'liter']

const stateKapasitas = reactive({
    id: '',
    kapasitas_produksi: 0
})
const state = reactive({
    no: '',
    id: '',
    nama: '',
    keterangan: '',
    kuantitas: 0,
    satuan: satuanOptions[0],
    harga: 0,
})
const stateReset = () => {
    state.nama = ''
    state.id = ''
    state.no = ''
    state.keterangan = ''
    state.satuan = satuanOptions[0]
    state.harga = 0
    state.kuantitas = 0
}
watch(kapasitas_produksi, (e)=> {
    if(kapasitas_produksi){
        // @ts-ignore 
        stateKapasitas.id = e?.id
        // @ts-ignore 
        stateKapasitas.kapasitas_produksi = e?.kapasitas ?? ''
    }
})


const isSubmit = ref(false)
async function onDelete(event: FormSubmitEvent<any>) {
    isSubmit.value = true
    const submitData = event.data

    $fetch('/api/habis-pakai', {
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

async function onSubmitKapasitas(event: FormSubmitEvent<any>) {
    isSubmit.value = true
    const submitData = event.data
    const method = submitData.id ? 'put' : 'post'
    console.log(submitData)

    $fetch('/api/kapasitas-produksi', {
        method: method,
        body: submitData
    })
        .then(async e => {
            toastSuccess(e.message)
            refresh_kapasitas()
            isOpenKapasitas.value = false
        })
        // @ts-ignore
        .catch(e => {
            console.log(e)
            const error = e?.response?.data?.message ?? 'An unknown error occurred.'
            toastError(error)
        }).finally(() => {
            isSubmit.value = false
        })
}

async function onSubmit(event: FormSubmitEvent<any>) {
    isSubmit.value = true
    const submitData = event.data
    const method = submitData.id ? 'put' : 'post'

    $fetch('/api/habis-pakai', {
        method: method,
        body: submitData
    })
        .then(async e => {
            toastSuccess(e.message)
            refresh()
            isOpen.value = false
        })
        // @ts-ignore
        .catch(e => {
            console.log(e)
            const error = e?.response?.data?.message ?? 'An unknown error occurred.'
            toastError(error)
        }).finally(() => {
            isSubmit.value = false
            stateReset()
        })
}

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
        label: 'Bahan Habis Pakai',
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