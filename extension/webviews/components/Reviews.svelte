<script lang="ts">
  export let reviews: string[];
</script>

<h2>read what other people think about this teacher</h2>
<ul>
  {#each reviews as review}
    <li>{review}</li>
  {/each}
</ul>

<style>
</style>
