<script lang="ts">
  import { onMount } from "svelte";
  import type { User, Page } from "../../src/types";
  import { isEmpty } from "lodash";

  import Avatar from "./Avatar.svelte";
  import FindTeacher from "./FindTeacher.svelte";
  import Profile from "./Profile.svelte";
  import Teacher from "./Teacher.svelte";

  let todos: Array<{ text: string; completed: boolean }> = [];
  let user: User | null = null;
  let teacher: User | null = null;
  let accessToken = "";
  let page: Page = tsvscode.getState()?.page || "profile";

  $: tsvscode.setState({ page });

  onMount(async () => {
    window.addEventListener("message", async (event) => {
      const message = event.data;

      switch (message.type) {
        case "newTodo":
          todos = [{ text: message.text, completed: false }, ...todos];
          break;
        case "token":
          accessToken = message.value;
          const response = await fetch(`${apiBaseUrl}/me`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          user = data.user;
          break;
      }
    });
    tsvscode.postMessage({ type: "getToken", value: undefined });
  });

  const handlePageSelection = (newPage: Page) => {
    page = newPage;
  };

  const handleTeacherSelection = (selectedTeacher: User) => {
    teacher = selectedTeacher;
  };
</script>

{#if isEmpty(user)}
  <button
    on:click={() => {
      tsvscode.postMessage({ type: "authenticate", value: undefined });
    }}>login with github</button
  >
{/if}

{#if !isEmpty(user) && page === "profile"}
  {#if user}
    <Profile {user} {accessToken} />
  {/if}
{/if}

{#if !isEmpty(user) && page === "homepage"}
  {#if user}
    <Avatar {user} />
  {/if}
  <FindTeacher {handlePageSelection} {handleTeacherSelection} {accessToken} />

  <button on:click={() => handlePageSelection("profile")}>update profile</button
  >
{/if}

{#if page === "teacher" && teacher}
  <Teacher {teacher} />
{/if}

<button on:click={() => handlePageSelection("homepage")}>find teachers</button>

<button
  on:click={() => {
    accessToken = "";
    user = null;
    tsvscode.postMessage({ type: "logout", value: undefined });
  }}>logout</button
>
