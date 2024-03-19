<template>
    <h1 class="text-2xl font-bold">
        Dashboard
    </h1>
    <UBreadcrumb divider="/" :links="[{ label: 'Home', to: '/dashboard' }]" />
    <div>
        <div class="my-4">
            
            <ClientOnly>
                <div class="sm:flex gap-x-5 gap-y-4 grid">
                    <UCard>
                        <apexchart  height="300" type="bar" :options="optionsKas" :series="series"
                            class="bg-transparent max-w-[48em] sm:w-[450px] w-[300px]"></apexchart>
                    </UCard>
                    <UCard>
                        <apexchart height="300" type="bar" :options="optionsKeuntungan" :series="series"
                            class="bg-transparent max-w-[48em] sm:w-[450px] w-[300px]"></apexchart>
                    </UCard>
                </div>
                <template #fallback>
                    <USkeleton class="w-full h-64" />
                </template>
            </ClientOnly>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    layout: 'dashboard'
})
useHead({
    title: 'dashboard'
})


const isLoading = ref(true)
const optionsKas = ref({
    chart: {
        id: 'vuechart-example',
        theme: {
            mode: 'light'
        },
    },
    title: {
        text: 'Kas Tersedia Akhir Bulan'
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
})
const optionsKeuntungan = ref({
    chart: {
        id: 'vuechart-example',
        theme: {
            mode: 'light'
        },
    },
    title: {
        text: 'Pertumbuhan Keuntungan'
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
})
const series = ref([{
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91]
}])

// const updateChartMode = () => {
//     options.value = {
//         ...options.value,
//         // @ts-ignore
//     }
//     options.value = {
//         ...options.value,
//         chart: {
//             id: 'vuechart-example',
//             background: '#ffffff0'
//         }
//     }
//     isLoading.value = false
// }


// onMounted(() => {
//     updateChartMode()
// })
</script>