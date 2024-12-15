<template>
  <Section id="error" :full-height="true">
    <div class="flex flex-col items-center justify-center h-full text-center">
      <h1 class="font-bold text-typography_primary">404 - Not Found</h1>
      <p class="text-typography_primary mt-6 text-lg leading-lg">
        You were looking for something that doesn't exist on this site. I recommend you go back and look for something else.
      </p>
      <NuxtLink
        to="/"
        target="_self"
        aria-label="Go back home."
        class="mx-auto mt-8 hover:underline hover:text-brand_primary"
      >
        Go back home
      </NuxtLink>
    </div>
  </Section>
</template>
