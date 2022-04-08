<script lang="ts">
  import type {
    User,
    Page,
    TechnologyTypes,
    TeacherFilters,
  } from "../../types";
  import {
    handleTechnologyType,
    handleTechnologyProficiency,
  } from "../utils/filterTeacher/index";
  import Avatar from "./Avatar.svelte";

  export let accessToken: string;
  export let handlePageSelection: (arg0: Page) => void;
  export let handleTeacherSelection: (arg0: User) => void;

  let teacherFilters: TeacherFilters = {
    minStarRating: 1,
    technologies: [],
    teacherPrice: 200,
  };
  let users: User[] = [];
  let advancedSearch: boolean = false;

  const handleAdvancedSearch = () => {
    advancedSearch = true;
  };

  const handleProficiencyInput = (event: any, technology: TechnologyTypes) => {
    teacherFilters = handleTechnologyProficiency({
      value: event.target.value,
      technology,
      currentFilters: teacherFilters,
    });
  };

  const handleTeacher = (selectedTeacher: User) => {
    handleTeacherSelection(selectedTeacher);
    handlePageSelection("teacher");
  };

  const handleMinStarRating = () => {
    const minStarRating: any = document.getElementById("star-rating");
    teacherFilters.minStarRating = minStarRating.value;
  };

  const handleTeacherMaxPrice = () => {
    const teacherPrice: any = document.getElementById("teacher-price");
    teacherFilters.teacherPrice = teacherPrice.value;
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

{#each teacherFilters.technologies as filter}
  <p>{filter.type}</p>
{/each}

<button on:click={() => handleAdvancedSearch()}>advanced search</button>
{#if advancedSearch}
  <p>for each technology tell us how proficient the teacher needs to be</p>
  <ul>
    {#each teacherFilters.technologies as technology}
      <div class="flex">
        <li>{technology.type}</li>
        <li>{technology.proficency}</li>
        <select
          name="proficiency"
          id="technology-proficiency"
          on:input={(event) => handleProficiencyInput(event, technology.type)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
    {/each}
  </ul>

  <p>
    only show me search results for teachers that have a minimum star rating of
  </p>
  <select name="star-rating" id="star-rating" on:input={handleMinStarRating}>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
  </select>

  <p>the max price i am willing to spend per hour is</p>
  <select
    name="teacher-price"
    id="teacher-price"
    on:input={handleTeacherMaxPrice}
  >
    <option value={1}>0</option>
    <option value={10}>10</option>
    <option value={50}>50</option>
    <option value={75}>75</option>
    <option value={100}>100</option>
    <option value={125}>125</option>
    <option value={150}>150</option>
    <option value={175}>175</option>
    <option value={200}>200</option>
  </select>
{/if}

<button
  on:click={async () => {
    console.log("getting this from db", teacherFilters);
    users = await (
      await fetch(`${apiBaseUrl}/findTeachers`, {
        method: "POST",
        body: JSON.stringify(teacherFilters),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken} `,
        },
      })
    ).json();

    console.log("wf", users);
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
