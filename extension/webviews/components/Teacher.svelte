<script lang="ts">
  import Avatar from "./Avatar.svelte";
  import StarRating from "./StarRating.svelte";
  import Reviews from "./Reviews.svelte";

  import type { User } from "../../src/types";
  export let teacher: User;
</script>

<Avatar user={teacher} />
<h2>bio</h2>
<p>{teacher.bio}</p>
<StarRating rating={4} />
<Reviews
  reviews={[
    "omg sooo good 5 stars",
    "probably the best teacher in the world",
    "fixed my problem within 30 seconds, so knowledable would highly recommend",
  ]}
/>
<button>send a message</button>
<button>send a screen recording</button>

<style>
</style>
