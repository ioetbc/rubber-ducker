<script lang="ts">
  import type { User, Page, TechnologyFilter } from "../../types";
  import Avatar from "./Avatar.svelte";
  import { handleTechnologyType } from "../utils/filterTeacher/index";

  export let accessToken: string;
  export let handlePageSelection: (arg0: Page) => void;
  export let handleTeacherSelection: (arg0: User) => void;

  let teacherFilters: TechnologyFilter = [];
  let users: User[] = [];
  let advancedSearch: boolean = false;

  const handleAdvancedSearch = () => {
    advancedSearch = true;
  };

  const handleTechnologyProficiency = (technology: string) => {
    const proficency: any = document.getElementById("technology-proficiency");
    teacherFilters.map((thing) => {
      if (thing.type === technology) {
        thing.proficency = Number(proficency.value);
      }
    });
  };

  const handleTeacher = (selectedTeacher: User) => {
    handleTeacherSelection(selectedTeacher);
    handlePageSelection("teacher");
  };

  const handleMinStarRating = () => {
    const minStarRating: any = document.getElementById("star-rating");
  };

  const handleTechnologyInput = (event: any) => {
    teacherFilters = handleTechnologyType({
      teacherFilters,
      value: event?.target?.value,
    });
  };
</script>

<label for="technologies">choose a technology:</label>
<select name="technologies" id="technologies" on:input={handleTechnologyInput}>
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

{#each teacherFilters as filter}
  <p>{filter.type}</p>
{/each}

<button on:click={() => handleAdvancedSearch()}>advanced search</button>
{#if advancedSearch}
  <p>for each technology tell us how proficient the teacher needs to be</p>
  <ul>
    {#each teacherFilters as technology}
      <div class="flex">
        <li>{technology.type}</li>
        <li>{technology.proficency}</li>
        <select
          name="proficiency"
          id="technology-proficiency"
          on:input={() => handleTechnologyProficiency(technology.type)}
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

  <p>
    only show me search results for teachers that have a minimum star rating of
  </p>
  <select name="star-rating" id="star-rating" on:input={handleMinStarRating}>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
{/if}

<button
  on:click={async () => {
    users = await (
      await fetch(`${apiBaseUrl}/users`, {
        method: "POST",
        body: JSON.stringify(teacherFilters),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken} `,
        },
      })
    ).json();
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
