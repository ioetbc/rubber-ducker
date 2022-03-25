<script lang="ts">
  import type { User } from "../../src/types";
  import yn from "yn";

  export let user: User;
  export let accessToken: string;

  let technolgiesSelected: string[] = [];
  let payload: User = {
    avatar_url: user?.avatar_url,
    github_id: user?.github_id,
    username: user?.username,
    bio: user?.bio,
    phone_number: user?.phone_number,
    email_marketing_consent: user?.email_marketing_consent,
    text_message_consent: user?.text_message_consent,
    teacher: user?.teacher,
    stripe_client_id: user?.stripe_client_id,
    crypto_wallet_address: "wodssssjwdowdowdk",
    has_completed_onboarding: "true",
    per_hour_rate: user?.per_hour_rate,
    html: user?.html,
    javascript: user?.javascript,
    node: user?.node,
    postgres: user?.postgres,
    python: user?.python,
    react: user?.react,
    css: user?.css,
    svelte: user?.svelte,
    tensorflow: user?.tensorflow,
    dynamo_db: user?.dynamo_db,
  };

  const handleUsername = (event: any) => {
    payload.username = event?.target?.value;
  };

  const handleBio = (event: any) => {
    payload.bio = event?.target?.value;
  };

  const handlePhoneNumber = (event: any) => {
    payload.phone_number = event?.target?.value;
  };

  const handleEmailMarketing = (event: any) => {
    payload.email_marketing_consent = event?.target?.value;
  };

  const handleTextConsent = (event: any) => {
    payload.text_message_consent = event?.target?.value;
  };

  const handleTeacherConsent = (event: any) => {
    payload.teacher = event?.target?.value;
  };

  const handlePerHourRate = () => {
    const perHourRateSelected: any = document.getElementById("per-hour-rate");
    payload.per_hour_rate = perHourRateSelected.value;
  };

  const handleTechnology = () => {
    const technologySelected: any = document.getElementById("technologies");
    technolgiesSelected.push(technologySelected.value);
    technolgiesSelected = technolgiesSelected;
    console.log("technolgiesSelected", technolgiesSelected);
  };

  const handleTechnologyProficiency = (technology: string) => {
    const technologyProficiencySelected: any = document.getElementById(
      "technology-proficiency"
    );

    // @ts-ignore
    payload[technology] = Number(technologyProficiencySelected.value);
    console.log("payload", payload);
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const response = await fetch(`${apiBaseUrl}/updateProfile`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken} `,
      },
    });

    const resp = await response.json();
  };
</script>

<form on:submit={handleFormSubmit}>
  <div class="input-wrapper">
    <label for="username">change username</label>
    <input
      on:input={handleUsername}
      name="username"
      id="bio"
      value={user?.username}
    />
  </div>

  <div class="input-wrapper">
    <label for="bio">add bio</label>
    <textarea on:input={handleBio} name="bio" maxlength="200" type="text" />
  </div>

  <div class="input-wrapper">
    <p>occasional marketing emails?</p>
    <div>
      <label for="email_marketing">true</label>
      <input
        on:input={handleEmailMarketing}
        type="radio"
        name="email_marketing"
        value="true"
        checked={!!user?.email_marketing_consent}
      />
      <label for="email_marketing">false</label>
      <input
        on:input={handleEmailMarketing}
        type="radio"
        name="email_marketing"
        value="false"
        checked={!!user?.email_marketing_consent}
      />
    </div>
  </div>

  <div class="input-wrapper">
    <p>would you like a text before your appointment?</p>
    <div>
      <label for="text_message_consent">true</label>
      <input
        on:input={handleTextConsent}
        type="radio"
        name="text_message_consent"
        value="true"
        checked={!!user?.text_message_consent}
      />
      <label for="text_message_consent">false</label>
      <input
        on:input={handleTextConsent}
        type="radio"
        name="text_message_consent"
        value="false"
        checked={!!user?.text_message_consent}
      />
    </div>
  </div>

  {#if yn(payload.text_message_consent)}
    <div class="input-wrapper">
      <label for="phone_number">add phone number</label>
      <p>so that we can text you before yourds appintments</p>
      <input on:input={handlePhoneNumber} name="phone_number" type="number" />
    </div>
  {/if}

  <div class="input-wrapper">
    <p>are you signing up to be a teacher</p>
    <p>allow people to contact you to get help with their projects</p>

    <div>
      <label for="teacher">true</label>
      <input
        on:input={handleTeacherConsent}
        type="radio"
        name="teacher"
        value="true"
        checked={!!user?.teacher}
      />
      <label for="teacher">false</label>
      <input
        on:input={handleTeacherConsent}
        type="radio"
        name="teacher"
        value="false"
        checked={!!user?.teacher}
      />
    </div>
  </div>

  {#if yn(payload.teacher)}
    <div class="input-wrapper">
      <label for="per-hour-rate">what is your per hour rate</label>
      <p>amount people will pay you per hour to get help with their projects</p>

      <select
        name="per-hour-rate"
        id="per-hour-rate"
        on:input={handlePerHourRate}
      >
        <option value="0">0</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
        <option value="70">70</option>
        <option value="80">80</option>
        <option value="90">90</option>
        <option value="100">100</option>
        <option value="110">110</option>
        <option value="120">120</option>
        <option value="130">130</option>
        <option value="140">140</option>
        <option value="150">150</option>
        <option value="160">160</option>
        <option value="170">170</option>
        <option value="180">180</option>
        <option value="190">190</option>
        <option value="200">200</option>
      </select>
    </div>

    <div class="input-wrapper">
      <label for="technologies">what technologies do you know?</label>
      <p>anything from html to dyanmodb (the more niche the better)</p>
      <select name="technologies" id="technologies" on:input={handleTechnology}>
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
    </div>
    <ul>
      {#each technolgiesSelected as technology}
        <div class="flex">
          <p>for each technology rate how proficient you are</p>
          <li>{technology}</li>
          <select
            name="proficiency"
            id="technology-proficiency"
            on:input={() => handleTechnologyProficiency(technology)}
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
  {/if}
  <button type="submit">submit changes</button>
</form>

<!-- <div class="input-wrapper">
  <label for="technology-proficency"
    >what is your proficency with the technologies</label
  >
  <ul>
    <li>0 = im actually quite shit</li>
    <li>10 = i invented the technology</li>
  </ul>
  <input name="technology-proficency" />
</div> -->
<style>
  .input-wrapper {
    margin-bottom: 24px;
  }
</style>
