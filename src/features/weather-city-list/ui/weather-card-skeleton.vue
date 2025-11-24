<script setup lang="ts"></script>
<template>
  <v-card class="weather-card mb-6" flat>
    <v-card-text class="pa-4">
      <div class="d-flex align-center mb-2">
        <v-skeleton-loader type="text" width="200" class="font-weight-bold"></v-skeleton-loader>
      </div>

      <div class="d-flex align-center mb-4">
        <div>
          <v-skeleton-loader type="image" width="64" height="64"></v-skeleton-loader>
        </div>
        <div class="ml-4">
          <v-skeleton-loader type="text" width="80" height="60" class="text-h2"></v-skeleton-loader>
        </div>
      </div>

      <div class="mb-4">
        <v-skeleton-loader type="text" width="100%" class="mb-1"></v-skeleton-loader>
        <v-skeleton-loader type="text" width="80%" class="mb-1"></v-skeleton-loader>
        <v-skeleton-loader type="text" width="70%"></v-skeleton-loader>
      </div>

      <v-row>
        <v-col cols="6">
          <div class="d-flex align-center mb-4">
            <v-skeleton-loader type="avatar" class="mr-2"></v-skeleton-loader>
            <div>
              <v-skeleton-loader
                type="text"
                width="60"
                class="text-caption mb-1"
              ></v-skeleton-loader>
              <v-skeleton-loader type="text" width="80" class="text-body-2"></v-skeleton-loader>
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="d-flex align-center mb-4">
            <v-skeleton-loader type="avatar" class="mr-2"></v-skeleton-loader>
            <div>
              <v-skeleton-loader
                type="text"
                width="60"
                class="text-caption mb-1"
              ></v-skeleton-loader>
              <v-skeleton-loader type="text" width="80" class="text-body-2"></v-skeleton-loader>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row class="mb-2">
        <v-col cols="6">
          <div class="d-flex align-center mb-4">
            <v-skeleton-loader type="avatar" class="mr-2"></v-skeleton-loader>
            <div>
              <v-skeleton-loader
                type="text"
                width="60"
                class="text-caption mb-1"
              ></v-skeleton-loader>
              <v-skeleton-loader type="text" width="80" class="text-body-2"></v-skeleton-loader>
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="d-flex align-center mb-4">
            <v-skeleton-loader type="avatar" class="mr-2"></v-skeleton-loader>
            <div>
              <v-skeleton-loader
                type="text"
                width="60"
                class="text-caption mb-1"
              ></v-skeleton-loader>
              <v-skeleton-loader type="text" width="80" class="text-body-2"></v-skeleton-loader>
            </div>
          </div>
        </v-col>
      </v-row>

      <div class="d-flex align-center">
        <v-skeleton-loader type="avatar" class="mr-2"></v-skeleton-loader>
        <div>
          <v-skeleton-loader type="text" width="60" class="text-caption mb-1"></v-skeleton-loader>
          <v-skeleton-loader type="text" width="80" class="text-body-2"></v-skeleton-loader>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
