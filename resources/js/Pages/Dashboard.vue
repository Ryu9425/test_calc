<script setup>
import { Head, Link } from "@inertiajs/inertia-vue3";
import { ref, onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
const logo_img = "/images/castlee_logo.png";

const currentDate = ref(null);

onMounted(() => {
    currentDate.value = new Date();
    console.log("date, ", currentDate);
});

const preMonth = () => {
    currentDate.value = moment(currentDate.value).subtract("months", 1).format("yyyy/MM")
    console.log("pre ", currentDate);
};
const nextMonth = () => {
    currentDate.value = moment(currentDate.value).add("months", 1).format("yyyy/MM");
    console.log("next ", currentDate);
};
</script>

<template>
    <Head title="Dashboard" />

    <div class="flex h-screen">
        <div class="container flex flex-col justify-center mx-auto">
            <div class="flex justify-center items-center">
                <img class="" :src="logo_img" />
            </div>
            <div class="flex justify-center items-center mb-8">
                <button
                    @click="preMonth"
                    class="inline-flex justify-center items-center m-2 p-4 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-backward-step fa-lg"></i>
                </button>
                <div>
                    <VueDatePicker
                        v-model="currentDate"
                        locale="ja"
                        format="yyyy年MM月"
                        modelType="yyyy/MM"
                        month-picker
                        auto-apply
                        input-class-name="!border-green-600 !placeholder:text-red-400 text-center !text-[20px] !text-bold !w-48"
                        placeholder="Select the month"
                    />
                </div>
                <button
                    @click="nextMonth"
                    class="inline-flex justify-center items-center m-2 p-4 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i
                        class="fa-solid fa-backward-step fa-rotate-180 fa-lg"
                    ></i>
                </button>
            </div>
            <div class="flex justify-center items-center mb-8">
                <Link   :href="route('calc',this.currentDate)"                  
                    class="inline-flex items-center w-40 m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
                >
                    <i class="fa-solid fa-right-to-bracket fa-lg p-2"></i>Play
                </Link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-gray-100 {
    background-color: #f7fafc;
    background-color: rgba(247, 250, 252, var(--tw-bg-opacity));
}

.border-gray-200 {
    border-color: #edf2f7;
    border-color: rgba(237, 242, 247, var(--tw-border-opacity));
}

.text-gray-400 {
    color: #cbd5e0;
    color: rgba(203, 213, 224, var(--tw-text-opacity));
}

.text-gray-500 {
    color: #a0aec0;
    color: rgba(160, 174, 192, var(--tw-text-opacity));
}

.text-gray-600 {
    color: #718096;
    color: rgba(113, 128, 150, var(--tw-text-opacity));
}

.text-gray-700 {
    color: #4a5568;
    color: rgba(74, 85, 104, var(--tw-text-opacity));
}

.text-gray-900 {
    color: #1a202c;
    color: rgba(26, 32, 44, var(--tw-text-opacity));
}

@media (prefers-color-scheme: dark) {
    .dark\:bg-gray-800 {
        background-color: #2d3748;
        background-color: rgba(45, 55, 72, var(--tw-bg-opacity));
    }

    .dark\:bg-gray-900 {
        background-color: #1a202c;
        background-color: rgba(26, 32, 44, var(--tw-bg-opacity));
    }

    .dark\:border-gray-700 {
        border-color: #4a5568;
        border-color: rgba(74, 85, 104, var(--tw-border-opacity));
    }

    .dark\:text-white {
        color: #fff;
        color: rgba(255, 255, 255, var(--tw-text-opacity));
    }

    .dark\:text-gray-400 {
        color: #cbd5e0;
        color: rgba(203, 213, 224, var(--tw-text-opacity));
    }
}
</style>
