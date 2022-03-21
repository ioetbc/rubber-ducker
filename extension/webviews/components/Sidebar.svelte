<script lang='ts'>
import { onMount } from "svelte";
    let todos: Array<{ text: string; completed: boolean }> = []
    let loading = true
    let user: { name: string, github_id: string, avatar_url: string } | null = null
    let accessToken = ''

    onMount(async () => {
    window.addEventListener('message', async event => {
        const message = event.data;

        switch (message.type) {
            case 'newTodo':
                todos = [{ text: message.text, completed: false }, ...todos]
                break;
            case 'token':
                accessToken = message.value
                const response = await fetch(`${apiBaseUrl}/me`, {
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                })
                const data = await response.json()
                user = data.user
                loading = false
                break
            }
        });
    tsvscode.postMessage({ type: 'getToken', value: undefined})
    })
</script>

<style>
    div {
        background: blue;
    }
</style>

{#if loading}
    <p>loading...</p>
{:else if user}
    <pre>{JSON.stringify(user, null, 2)}</pre>
{:else}
    <p>no user is logged in </p>
{/if}

<div>{JSON.stringify(todos)}</div>

<button on:click={() => {
    tsvscode.postMessage({
        type: 'onInfo',
        value: 'some info'
    })
}}>click this for info</button>

<button on:click={() => {
    tsvscode.postMessage({
        type: 'onError',
        value: 'there was an error'
    })
}}>click this for error</button>

