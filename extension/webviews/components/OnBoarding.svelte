<script lang="ts">
  import type { User } from "../../src/types";

  export let user: User;
  export let accessToken: string;

  let payload = {
    username: user.username,
    bio: user.bio,
    phone_number: user.phone_number,
    email_marketing_consent: user.email_marketing_consent,
    text_message_consent: user.text_message_consent,
    teacher: user.teacher,
    stripe_client_id: user.stripe_client_id,
    crypto_wallet_address: "wodjwdowdowdk",
    has_completed_onboarding: "true",
    // per_hour_rate: user.per_hour_rate,
  };

  // migration to add per_hour_rate

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

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    console.log("form", payload);

    const response = await fetch(`${apiBaseUrl}/updateProfile`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken} `,
      },
    });

    const resp = await response.json();
    console.log("resp", resp);
  };

  console.log("payload bithc", payload);
</script>

<form on:submit={handleFormSubmit}>
  <div class="input-wrapper">
    <label for="username">change username</label>
    <input
      on:input={handleUsername}
      name="username"
      id="bio"
      value={user.username}
    />
  </div>

  <div class="input-wrapper">
    <label for="bio">add bio</label>
    <textarea on:input={handleBio} name="bio" maxlength="200" type="text" />
  </div>

  <div class="input-wrapper">
    <label for="phone_number">add phone number</label>
    <p>so that we can text you before yourds appintments</p>
    <input on:input={handlePhoneNumber} name="phone_number" type="number" />
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
        checked={!!user.email_marketing_consent}
      />
      <label for="email_marketing">false</label>
      <input
        on:input={handleEmailMarketing}
        type="radio"
        name="email_marketing"
        value="false"
        checked={!!user.email_marketing_consent}
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
        checked={!!user.text_message_consent}
      />
      <label for="text_message_consent">false</label>
      <input
        on:input={handleTextConsent}
        type="radio"
        name="text_message_consent"
        value="false"
        checked={!!user.text_message_consent}
      />
    </div>
  </div>

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
        checked={!!user.teacher}
      />
      <label for="teacher">false</label>
      <input
        on:input={handleTeacherConsent}
        type="radio"
        name="teacher"
        value="false"
        checked={!!user.teacher}
      />
    </div>
  </div>
  <button type="submit">submit changes</button>
</form>

<!-- <div class="input-wrapper">
  <label for="per-hour-rate">what is your per hour rate</label>
  <p>amount people will pay you per hour to get help with their projects</p>

  <select
    name="per-hour-rate"
    id="per-hour-rate"
    on:blur={() => getPerHourRateSelection()}
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
  <label for="technologies">what languages do you know?</label>
  <p>anything from html to dyanmodb (the more niche the better)</p>
  <select
    name="technologies"
    id="technologies"
    on:blur={() => getTechnologiesSelection()}
  >
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

<div class="input-wrapper">
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
