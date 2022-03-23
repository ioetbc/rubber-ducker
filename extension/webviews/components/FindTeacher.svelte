<script lang="ts">
  import type { User } from "../../src/types";
  import Avatar from "./Avatar.svelte";

  export let accessToken: string;

  let technologyfilters: Array<{ language: string; proficency: number }> = [];
  let users: User[] = [];

  const getSelection = () => {
    const technologySelected: any = document.getElementById("technologies");
    if (technologySelected) {
      technologyfilters.push({
        language: technologySelected.value,
        proficency: 5,
      });
      technologyfilters = technologyfilters;
    }
  };
</script>

<label for="technologies">Choose a technology:</label>

<!-- TODO get the columns from the db instead of hardcoding -->
<select name="technologies" id="technologies" on:blur={() => getSelection()}>
  <option value="javascript">javascript</option>
  <option value="html">html</option>
  <option value="css">css</option>
  <option value="node">node</option>
  <option value="python">python</option>
  <option value="react">react</option>
  <option value="svelte">svelte</option>
  <option value="postgres">postgres</option>
  <option value="dynamo_db">dynamo_db</option>
  <option value="tensorflow">tensorflow</option>
</select>

{#each technologyfilters as filter}
  <p>{filter.language}</p>
{/each}

<button
  on:click={async () => {
    const res = await fetch(`${apiBaseUrl}/users`, {
      method: "POST",
      body: JSON.stringify(technologyfilters),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken} `,
      },
    });

    const resp = await res.json();
    users = resp;
  }}>FIND HELPERS</button
>
<div class="helper-wrapper">
  {#each users as user}
    <Avatar {user} />
  {/each}
</div>

<style>
</style>
