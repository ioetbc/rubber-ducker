<script lang="ts">
  import type { User, Page } from "../../src/types";
  import Avatar from "./Avatar.svelte";

  export let accessToken: string;
  export let handlePageSelection: (arg0: Page) => void;
  export let handleTeacherSelection: (arg0: User) => void;

  let technologyfilters: Array<{ language: string; proficency: number }> = [];
  let users: User[] = [];
  let advancedSearch: boolean = false;

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

  const handleAdvancedSearch = () => {
    advancedSearch = true;
  };

  const handleTechnologyProficiency = (technology: string) => {
    const proficency: any = document.getElementById("technology-proficiency");
    technologyfilters.map((thing) => {
      if (thing.language === technology) {
        thing.proficency = Number(proficency.value);
      }
    });
  };

  const handleTeacher = (selectedTeacher: User) => {
    handleTeacherSelection(selectedTeacher);
    handlePageSelection("teacher");
  };
</script>

<label for="technologies">choose a technology:</label>
<select name="technologies" id="technologies" on:input={getSelection}>
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

<button on:click={() => handleAdvancedSearch()}>advanced search</button>
{#if advancedSearch}
  <p>for each technology tell us how proficient the teacher needs to be</p>
  <ul>
    {#each technologyfilters as technology}
      <div class="flex">
        <li>{technology.language}</li>
        <li>{technology.proficency}</li>
        <select
          name="proficiency"
          id="technology-proficiency"
          on:input={() => handleTechnologyProficiency(technology.language)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
    {/each}
  </ul>
{/if}

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
  }}>search</button
>
<div class="helper-wrapper">
  {#each users as user}
    <div on:click={() => handleTeacher(user)}>
      <Avatar {user} />
    </div>
  {/each}
</div>

<style>
</style>
