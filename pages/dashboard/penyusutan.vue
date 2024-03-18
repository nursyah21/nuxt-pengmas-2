<template>
    <h1 class="text-2xl font-bold">
        Penyusutan
    </h1>
    <UBreadcrumb divider="/"
        :links="[{ label: 'Home', to: '/dashboard' }, { label: 'Penyusutan', to: '/dashboard/penyusutan' }]" />

    <div class="my-4">
        <div class="flex flex-col gap-y-2">
            <template v-if="rows">
                <div>
                    <UButton color="gray" class="cursor-default">
                        Total Penyusutan pertahun: {{ formatNumber(rows.penyusutan_tahun) }}
                    </UButton>
                </div>
                <div>
                    <UButton color="gray" class="cursor-default">
                        Total Penyusutan perbulan: {{ formatNumber(rows.penyusutan_bulan) }}
                    </UButton>
                </div>
                <div>
                    <UButton color="gray" class="cursor-default">
                        Total Penyusutan perhari: {{ formatNumber(rows.penyusutan_tahun) }}
                    </UButton>
                </div>
                <div>
                    <UButton color="gray" class="cursor-default">
                        Total Penyusutan perhari perunit: {{ formatNumber(rows.penyusutan_unit) }}
                    </UButton>
                </div>
            </template>
        </div>
        <ClientOnly>
            <UTable :rows="rows?.data" :columns="columns" :loading="pending">
                <template #nilai-data="{ row }">
                    {{ formatNumber(row.nilai) }}
                </template>
                <template #residu-data="{ row }">
                    {{ formatNumber(row.residu) }}
                </template>
                <template #penyusutan_tahun-data="{ row }">
                    {{ formatNumber(row.penyusutan_tahun) }}
                </template>
                <template #penyusutan_bulan-data="{ row }">
                    {{ formatNumber(row.penyusutan_bulan) }}
                </template>
                <template #penyusutan_hari-data="{ row }">
                    {{ formatNumber(row.penyusutan_hari) }}
                </template>
                <template #penyusutan_hari_unit-data="{ row }">
                    {{ formatNumber(row.penyusutan_hari_unit) }}
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

    <!-- edit/add -->
    <UModal v-model="isOpen" :prevent-close="isSubmit">
        <ClientOnly>
            <UForm  :state="state" class="space-y-4 m-4" @submit="onSubmit">
                <UFormGroup label="Nama Peralatan" name="nama">
                    <UInput v-model="state.nama" disabled />
                </UFormGroup>

                <UFormGroup label="Nilai" name="keterangan">
                    <UInput v-model="state.nilai" disabled/>
                </UFormGroup>

                <UFormGroup label="Nilai Residu" name="kuantitas">
                    <UInput v-model="state.residu"/>
                </UFormGroup>

                <UFormGroup label="Umur Ekonomis" name="kuantitas">
                    <UInput v-model="state.umur"/>
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
    `/api/penyusutan`
)

// @ts-ignore
const items = (row) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => {
            state.nama = row.nama
            state.id = row.id
            state.nilai = row.nilai
            state.residu = row.residu
            state.umur = row.umur
            isOpen.value = true
        }
    }]
]

const isDelete = ref(false)


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
    nilai: '',
    residu: 0,
    umur: 0
})
const stateReset = () => {
    state.nama = ''
    state.id = ''
    state.no = ''
    state.nilai = ''
    state.residu = 0
    state.umur = 0
}


const isSubmit = ref(false)


async function onSubmit(event: FormSubmitEvent<any>) {
    isSubmit.value = true
    const submitData = event.data
    const method = submitData.id ? 'put' : 'post'

    $fetch('/api/penyusutan', {
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
    title: 'penyusutan'
})

const columns = [
    {
        key: 'no',
        label: 'No',
        sortable: true
    }, {
        key: 'nama',
        label: 'Nama Peralatan',
        sortable: true
    },
    {
        key: 'nilai',
        label: 'Nilai',
        sortable: true
    },
    {
        key: 'residu',
        label: 'NIlai Residu',
        sortable: true
    },
    {
        key: 'umur',
        label: 'Umur ekonomis',
        sortable: true
    },
    {
        key: 'penyusutan_tahun',
        label: 'Penyusutan Pertahun',
        sortable: true
    },
    {
        key: 'penyusutan_bulan',
        label: 'Penyusutan Perbulan',
        sortable: true
    },
    {
        key: 'penyusutan_hari',
        label: 'Penyusutan Perhari',
        sortable: true
    },
    {
        key: 'penyusutan_hari_unit',
        label: 'Penyusutan Perhari Perunit',
        sortable: true
    },
    {
        key: 'actions'
    }
]

</script>