<script lang="ts">
  import Avatar from "./Avatar.svelte";
  import StarRating from "./StarRating.svelte";
  import Reviews from "./Reviews.svelte";

  import type { User } from "../../src/types";
  import { onMount } from "svelte";

  export let teacher: User;
  export let accessToken: string;

  let reviews: { averageStarRating: number; reviews: string[] };
  let showReviewInput: boolean = false;
  let newReview: { review: string; stars: number } = { review: "", stars: 0 };

  onMount(async () => {
    reviews = await (
      await fetch(`${apiBaseUrl}/reviews?github_id=${teacher.github_id}`, {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      })
    ).json();
  });

  const handleReview = (event: any) => {
    newReview.review = event?.target?.value;
  };

  const handleStarRating = () => {
    const starRating: any = document.getElementById("star-rating");
    newReview.stars = starRating.value;
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    reviews = await (
      await fetch(
        `${apiBaseUrl}/createReview?teacher_id=${teacher.github_id}`,
        {
          method: "POST",
          body: JSON.stringify(newReview),
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${accessToken} `,
          },
        }
      )
    ).json();
  };
</script>

<Avatar user={teacher} />
<h2>bio</h2>
<p>{teacher.bio}</p>
{#if reviews}
  <StarRating rating={reviews.averageStarRating} />
  <Reviews reviews={reviews.reviews} />
{/if}
<button>send a message</button>
<button on:click={() => (showReviewInput = true)}>leave a review</button>

{#if showReviewInput}
  <form on:submit={handleFormSubmit}>
    <label for="review-message">write review</label>
    <textarea
      on:input={handleReview}
      name="review-message"
      maxlength="200"
      type="text"
    />

    <label for="star-rating">how may stars would you rate them?</label>

    <select name="star-rating" id="star-rating" on:input={handleStarRating}>
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>

    <button type="submit">submit review</button>
  </form>
{/if}
<button>send a screen recording</button>

<style>
</style>
