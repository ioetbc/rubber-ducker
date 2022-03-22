<script lang="ts">
  import type { User } from "../../src/types";

  export let user: User;
</script>

<ul>
  <li class="avatar-wrapper">
    <img class="avatar-image" src={user?.avatar_url} alt="profile avatar" />
    <p>{user?.username}</p>
  </li>
</ul>

<style>
  ul {
    list-style: none;
    padding-left: 0;
  }
  .avatar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar-image {
    width: 50px;
    border-radius: 50%;
  }
</style>
