<script lang="ts">
  import { onMount } from "svelte";
  import type { User } from "../../types";

  let todos: Array<{ text: string; completed: boolean }> = [];
  let loading = true;
  let user: User | null = null;
  let accessToken = "";
  let users: User = [];
  let technologyfilters: Array<{ language: string; proficency: number }> = [];

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
          loading = false;
          break;
      }
    });
    tsvscode.postMessage({ type: "getToken", value: undefined });
  });

  function getSelection() {
    const technologySelected: any = document.getElementById("technologies");
    console.log("technologySelected", technologySelected);
    if (technologySelected) {
      technologyfilters.push({
        language: technologySelected.value,
        proficency: 5,
      });
      technologyfilters = technologyfilters;
    }
    console.log("technologyfilters", technologyfilters);
  }
</script>

{#if loading}
  <p>loading...</p>
{:else if user}
  <!-- <pre>{JSON.stringify(user, null, 2)}</pre> -->
  <ul>
    <li>
      <img src={user.avatar_url} alt="profile avatar" />
      <p>{user.username}</p>
    </li>
  </ul>
{:else}
  <button
    on:click={() => {
      tsvscode.postMessage({ type: "authenticate", value: undefined });
    }}>login with github</button
  >
{/if}

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
    console.log("users", users);
  }}>FIND HELPERS</button
>

{#each users as user}
  <ul>
    <li>
      <img src={user.avatar_url} alt="profile avatar" />
      <p>{user.username}</p>
    </li>
  </ul>
{/each}

<button
  on:click={() => {
    accessToken = "";
    user = null;
    tsvscode.postMessage({ type: "logout", value: undefined });
  }}>logout</button
>
