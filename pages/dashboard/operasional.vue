<template>
    <h1 class="text-2xl font-bold">
        Operasional
    </h1>
    <UBreadcrumb divider="/"
        :links="[{ label: 'Home', to: '/dashboard' }, { label: 'Operasional', to: '/dashboard/operasional' }]" />

    <div class="my-4">
        <ClientOnly>
            <div class="flex flex-col gap-y-4 my-2">
                <div class="flex gap-x-4">
                    <UButton @click="{ ; stateReset(); mode = 'perjalanan'; isOpen = true ; isDelete = false}"
                        icon="i-material-symbols:add">
                        tambahkan Biaya Perjalanan
                    </UButton>
                    <UButton color="gray" class="cursor-default">
                        Total: {{ formatNumber(rows?.total_jalan) }}
                    </UButton>
                </div>
            </div>
            <UTable :rows="rows?.perjalanan" :columns="columnsPerjalanan" :loading="pending">
                <template #harga_perjalanan-data="{ row }">
                    {{ formatNumber(row.harga_perjalanan) }}
                </template>
                <template #jumlah_perjalanan-data="{ row }">
                    {{ formatNumber(row.harga_perjalanan * row.kuantitas_perjalanan) }}
                </template>
                <template #actions-data="{ row }">
                    <UDropdown :items="itemsJalan(row)">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                </template>
            </UTable>
            <template #fallback>
                <USkeleton class="w-full h-64" />
            </template>

        </ClientOnly>

        <UDivider class="my-4" />

        <ClientOnly>
            <div class="flex flex-col gap-y-4 my-2 mt-8">
                <div class="flex gap-x-4">
                    <UButton @click="{ ; stateReset(); isOpen = true; isDelete = false; mode = '' }" icon="i-material-symbols:add">
                        tambahkan Biaya Lain-Lain
                    </UButton>
                    <UButton color="gray" class="cursor-default">
                        Total: {{ formatNumber(rows?.total_lain) }}
                    </UButton>
                </div>
            </div>
            <UTable :rows="rows?.lain_lain" :columns="columnsLain" :loading="pending">                
                <template #harga_lain_lain-data="{ row }">
                    {{ formatNumber(row.harga_lain_lain) }}
                </template>
                <template #jumlah_lain_lain-data="{ row }">
                    {{ formatNumber(row.harga_lain_lain * row.kuantitas_lain_lain) }}
                </template>
                <template #actions-data="{ row }">
                    <UDropdown :items="itemsLain(row)">
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

    <!-- edit/add -->
    <UModal v-model="isOpen" :prevent-close="isSubmit">
        <ClientOnly>
            <UForm :state="state" class="space-y-4 m-4" @submit="onSubmit">
                <UFormGroup :label="mode == 'perjalanan' ? 'Biaya Perjalanan' : 'Biaya Lain Lain'" name="nama">
                    <UInput v-model="state.nama" :disabled="isDelete"/>
                </UFormGroup>

                <UFormGroup label="Keterangan" name="keterangan">
                    <UInput v-model="state.keterangan" :disabled="isDelete" />
                </UFormGroup>

                <UFormGroup label="Kuantitas" name="kuantitas">
                    <UInput v-model="state.kuantitas" type="number" :disabled="isDelete" />
                </UFormGroup>

                <UFormGroup label="Satuan" name="satuan">
                    <UInput v-model="state.satuan" :disabled="isDelete" />
                </UFormGroup>

                <UFormGroup label="harga" name="harga">
                    <UInput v-model="state.harga" type="number" :disabled="isDelete" />
                </UFormGroup>

                <UButton :disabled="isSubmit" type="submit" class="w-full justify-center" :color="isDelete ? 'red' : 'primary'">
                    <template v-if="isSubmit">
                        <UIcon name="i-eos-icons-loading" /> Please wait...
                    </template>
                    <template v-else>
                        {{isDelete ? "Delete": "Submit"}}
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
    `/api/operasional`
)

// @ts-ignore
const itemsJalan = (row) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => {
            mode.value = 'perjalanan'
            state.nama = row.nama_perjalanan
            state.id = row.id
            state.keterangan = row.keterangan_perjalanan
            state.satuan = row.satuan_perjalanan
            state.harga = Number(row.harga_perjalanan)
            state.kuantitas = Number(row.kuantitas_perjalanan)
            isOpen.value = true
            isDelete.value = false
        }
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => {
            mode.value = 'perjalanan'
            state.nama = row.nama_perjalanan
            state.id = row.id
            state.keterangan = row.keterangan_perjalanan
            state.satuan = row.satuan_perjalanan
            state.harga = Number(row.harga_perjalanan)
            state.kuantitas = Number(row.kuantitas_perjalanan)
            isOpen.value = true
            isDelete.value = true
        }
    }]
]

// @ts-ignore
const itemsLain = (row) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => {
            mode.value = ''
            state.nama = row.nama_lain_lain
            state.id = row.id
            state.keterangan = row.keterangan_lain_lain
            state.satuan = row.satuan_lain_lain
            state.harga = Number(row.harga_lain_lain)
            state.kuantitas = Number(row.kuantitas_lain_lain)
            isOpen.value = true
            isDelete.value = false
        }
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => {
            mode.value = ''
            state.nama = row.nama_lain_lain
            state.id = row.id
            state.keterangan = row.keterangan_lain_lain
            state.satuan = row.satuan_lain_lain
            state.harga = Number(row.harga_lain_lain)
            state.kuantitas = Number(row.kuantitas_lain_lain)
            isOpen.value = true
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
const mode = ref('')

const state = reactive({
    no: '',
    id: '',
    nama: '',
    keterangan: '',
    kuantitas: 0,
    satuan: '',
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

async function onSubmit(event: FormSubmitEvent<any>) {
    isSubmit.value = true
    const submitData = event.data
    const method = submitData.id ? 'put' : 'post'
    console.log(submitData)

    $fetch('/api/operasional', {
        method: isDelete.value ? 'delete' : method,
        body: mode.value == 'perjalanan' ? {
            id: submitData.id,
            nama_perjalanan: state.nama,
            keterangan_perjalanan: state.keterangan,
            kuantitas_perjalanan: state.kuantitas,
            satuan_perjalanan: state.satuan,
            harga_perjalanan: state.harga
        } : {
            id: submitData.id,
            nama_lain_lain: state.nama,
            keterangan_lain_lain: state.keterangan,
            kuantitas_lain_lain: state.kuantitas,
            satuan_lain_lain: state.satuan,
            harga_lain_lain: state.harga
        }
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
    title: 'operasional'
})

const columnsPerjalanan = [
    {
        key: 'no',
        label: 'No',
        sortable: true
    }, {
        key: 'nama_perjalanan',
        label: 'Biaya Perjalanan',
        sortable: true
    },
    {
        key: 'keterangan_perjalanan',
        label: 'Keterangan',
    },
    {
        key: 'kuantitas_perjalanan',
        label: 'Kuantitas',
    },
    {
        key: 'satuan_perjalanan',
        label: 'Satuan',
    },
    {
        key: 'harga_perjalanan',
        label: 'Harga',
        sortable: true
    },
    {
        key: 'jumlah_perjalanan',
        label: 'Jumlah',
        sortable: true
    },
    {
        key: 'actions'
    }
]

const columnsLain = [
    {
        key: 'no',
        label: 'No',
        sortable: true
    }, {
        key: 'nama_lain_lain',
        label: 'Biaya Lain-Lain',
        sortable: true
    },
    {
        key: 'keterangan_lain_lain',
        label: 'Keterangan',
    },
    {
        key: 'kuantitas_lain_lain',
        label: 'Kuantitas',
    },
    {
        key: 'satuan_lain_lain',
        label: 'Satuan',
    },
    {
        key: 'harga_lain_lain',
        label: 'Harga',
        sortable: true
    },
    {
        key: 'jumlah_lain_lain',
        label: 'Jumlah',
        sortable: true
    },
    {
        key: 'actions'
    }
]

</script>