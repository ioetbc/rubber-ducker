<script lang="ts">
  import { io } from "socket.io-client";
  import { onMount } from "svelte";
  import yn from "yn";
  import type { User } from "../../src/types";
  import Avatar from "./Avatar.svelte";

  import FindTeacher from "./FindTeacher.svelte";
  import OnBoarding from "./OnBoarding.svelte";

  let todos: Array<{ text: string; completed: boolean }> = [];
  let loading = true;
  let user: User | null = null;
  let accessToken = "";
  let socket: any;
  let chatMessage: any = [];
  let page: "settings" | "contact" = tsvscode.getState()?.page || "settings";

  //called whenever the vars change (like useEffect)
  $: {
    tsvscode.setState({ page });
  }

  onMount(async () => {
    socket = io("http://localhost:3003");

    socket.on("connect", () => {
      socket.on("message-from-server", (message: string) => {
        chatMessage = [message, ...chatMessage];
      });
    });

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
          console.log(user);
          loading = false;
          break;
      }
    });
    tsvscode.postMessage({ type: "getToken", value: undefined });
  });

  const sendMessage = (message: string) => {
    socket.emit("message-from-client", message);
  };
</script>

<!-- {#if loading}
  <p>loading...</p> -->

{#if !user}
  <button
    on:click={() => {
      tsvscode.postMessage({ type: "authenticate", value: undefined });
    }}>login with github</button
  >
{/if}

{#if user && !yn(user.has_completed_onboarding)}
  <OnBoarding {user} {accessToken} />
{/if}

{#if user && yn(user.has_completed_onboarding)}
  <Avatar {user} />

  <FindTeacher {accessToken} />

  <button
    on:click={() => {
      sendMessage("socker.io is fucking working????");
    }}>send message</button
  >
{/if}

<button
  on:click={() => {
    accessToken = "";
    user = null;
    tsvscode.postMessage({ type: "logout", value: undefined });
  }}>logout</button
>

<!-- {#if page === "settings"}
    <p>THIS IS THE SETTINGS PAGE</p>
    <button on:click={() => (page = "contact")}
      >change to the contact page</button
    >
  {:else}
    <p>THIS IS THE CONTACT PAGE</p>
    <button on:click={() => (page = "settings")}
      >change to the settings page</button
    >
  {/if} -->
