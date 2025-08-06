<script setup>
import PaymentCard from "@/components/payment/Card.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isAuthenticated = route.query.authenticated === "true";
</script>

<template>
  <PaymentCard :qrEnabled="isAuthenticated" />
</template>
