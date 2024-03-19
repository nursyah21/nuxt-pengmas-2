<template>
    <header class="flex items-center justify-between h-20 px-6 border-b w-full dark:border-gray-700">

        <div class="relative flex items-center">
            <!-- <h1 class="text-2xl">
                Analisis Kelayakan Usaha
            </h1> -->
            <!-- <UInput icon="i-heroicons-magnifying-glass-20-solid" variant="outline" placeholder="Search..." /> -->
        </div>

        <div class="sm:hidden flex items-center gap-x-4">
            <!-- <ULink to="/dashboard/settings">
                <div class="flex items-center gap-x-1 hover:opacity-80 transition-opacity duration-600">
                    <div class="flex flex-col">
                        <span class="font-semibold text-sm">Dhaiflaah</span>
                        <span class="text-xs">Lecturer</span>
                    </div>
                    <UAvatar src="https://randomuser.me/api/portraits/men/1.jpg" alt="Avatar" />
                </div>
            </ULink> -->

            <!-- <UChip :show="notification.show" :text="notification.count" size="2xl" :color="colorPrimary">
                <UButton icon="i-heroicons-bell" color="gray" />
            </UChip> -->

            <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                <UButton color="gray" icon="i-material-symbols:menu">
                </UButton>
            </UDropdown>
        </div>

    </header>
</template>

<script setup>
const items = [
    [{
        label: 'Dashboard',
        icon: 'i-material-symbols:dashboard',
        click: () => {
            navigateTo('/dashboard')
        }
    },
    {
        label: 'Peralatan',
        click: () => {
            navigateTo('/dashboard/peralatan')
        }
    },
    {
        label: 'Habis Pakai',
        click: () => {
            navigateTo('/dashboard/habis-pakai')
        }
    },
    {
        label: 'Penyusutan',
        click: () => {
            navigateTo('/dashboard/penyusutan')
        }
    },
    {
        label: 'Operasional',
        click: () => {
            navigateTo('/dashboard/operasional')
        }
    },
    {
        label: 'Investasi',
        click: () => {
            navigateTo('/dashboard/investasi')
        }
    }
    ],
]
</script>