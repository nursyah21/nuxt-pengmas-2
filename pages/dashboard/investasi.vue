<template>
    <h1 class="text-2xl font-bold">
        Investasi
    </h1>
    <UBreadcrumb divider="/"
        :links="[{ label: 'Home', to: '/dashboard' }, { label: 'Investasi', to: '/dashboard/investasi' }]" />

    <div class="my-4">
        <ClientOnly>

            <UTable :rows="rows" :columns="columns" :loading="pending">
                <template #perlengkapan-data="{ row }">
                    {{ formatNumber(row.perlengkapan) }}
                </template>
                <template #habis_pakai-data="{ row }">
                    {{ formatNumber(row.habis_pakai) }}
                </template>
                <template #perjalanan-data="{ row }">
                    {{ formatNumber(row.perjalanan) }}
                </template>
                <template #lainlain-data="{ row }">
                    {{ formatNumber(row.lainlain) }}
                </template>
                <template #total-data="{ row }">
                    {{ formatNumber(row.total) }}
                </template>
            </UTable>
            <template #fallback>
                <USkeleton class="w-full h-64" />
            </template>

        </ClientOnly>
    </div>




</template>

<script setup lang="ts">

const { data: rows, pending, refresh } = await useLazyFetch(() =>
    `/api/investasi`
)

console.log(rows)

definePageMeta({
    layout: 'dashboard'
})
useHead({
    title: 'investasi'
})

const columns = [
    {
        key: 'perlengkapan',
        label: 'Perlengkapan',
    },
    {
        key: 'habis_pakai',
        label: 'Bahan Habis Pakai',
    },
    {
        key: 'perjalanan',
        label: 'Perjalanan',
    },
    {
        key: 'lainlain',
        label: 'Lain Lain',
    },
    {
        key: 'total',
        label: 'Total Investasi',
    },
]

</script>