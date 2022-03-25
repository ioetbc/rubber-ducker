<script lang="ts">
  // import { io } from "socket.io-client";
  import { onMount } from "svelte";
  import yn from "yn";
  import type { User } from "../../src/types";
  import { isEmpty } from "lodash";

  import Avatar from "./Avatar.svelte";
  import FindTeacher from "./FindTeacher.svelte";
  import Profile from "./Profile.svelte";

  let todos: Array<{ text: string; completed: boolean }> = [];
  let user: User | null = null;

  let accessToken = "";
  let page: "profile" | "contact" | "homepage" =
    tsvscode.getState()?.page || "profile";

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
  <FindTeacher {accessToken} />

  <button on:click={() => (page = "profile")}>update profile</button>
{/if}

<button
  on:click={() => {
    page = "homepage";
  }}>find teachers</button
>

<button
  on:click={() => {
    accessToken = "";
    user = null;
    tsvscode.postMessage({ type: "logout", value: undefined });
  }}>logout</button
>
