<script>
import * as lang from "../../js/utils/languages";

export default {
  computed: {
    lang() {
      return lang;
    },
  },
  props: {
    funcTitle: {
      type: String,
      required: true,
    },
    funcName: {
      type: String,
      required: true,
    },
    storageName: {
      type: String,
      required: true,
    },
    justDomain: {
      type: Boolean,
      required: true,
    },
    fgLanguage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div class="title">
    {{ lang.getTranslation(fgLanguage, funcName) }}
  </div>
  <div class="about">
    <div class="about-paragraph">
      <p>{{ lang.getTranslation(fgLanguage, "aboutText_p1") }}</p>
      <p>{{ lang.getTranslation(fgLanguage, "aboutText_p2_1") }}</p>
      <p>
        <a href="https://github.com/kereszteszsolt/PA_Focus_Guard"
          >Github Focus Guard</a
        >
      </p>
      <p>{{ lang.getTranslation(fgLanguage, "aboutText_p2_2") }}</p>
      <p><a href="https://www.youtube.com/">Youtube English</a></p>
      <p><a href="https://www.youtube.com/">Youtube Hungarian</a></p>
      <p>{{ lang.getTranslation(fgLanguage, "aboutText_p3") }}</p>
    </div>
    <div class="social-media-links">
      <div class="social-media-item">
        <a href="https://www.youtube.com/channel/">
          <img src="/assets/icons/icons8-youtube-48.png" alt="youtube" />
          <span>Youtube Hu</span>
        </a>
      </div>
      <div class="social-media-item">
        <a href="https://www.youtube.com/channel/">
          <img src="/assets/icons/icons8-youtube-48.png" alt="youtube" />
          <span>Youtube En</span>
        </a>
      </div>
      <div class="social-media-item">
        <a href="https://www.instagram.com/kereszteszsolt_kzs">
          <img src="/assets/icons/icons8-instagram-48.png" alt="instagram" />
          <span>Instagram</span>
        </a>
      </div>
      <div class="social-media-item">
        <a href="https://www.facebook.com/KeresztesZsolt.kzs">
          <img src="/assets/icons/icons8-facebook-48.png" alt="facebook" />
          <span>Facebook</span>
        </a>
      </div>
      <div class="social-media-item">
        <a href="https://www.linkedin.com/in/keresztes-zsolt">
          <img src="/assets/icons/icons8-linkedin-48.png" alt="linkedin" />
          <span>LinkedIn</span>
        </a>
      </div>
      <div class="social-media-item">
        <a href="https://twitter.com/KeresztesZsolti">
          <img src="/assets/icons/icons8-twitter-48.png" alt="twitter" />
          <span>Twitter / X</span>
        </a>
      </div>
      <div class="social-media-item">
        <a href="https://github.com/kereszteszsolt">
          <img src="/assets/icons/icons8-github-48.png" alt="github" />
          <span>GitHub</span>
        </a>
      </div>
      <div class="social-media-item">
        <a href="https://www.tiktok.com/@kereszteszsolti">
          <img src="/assets/icons/icons8-tiktok-48.png" alt="tiktok" />
          <span>TikTok</span>
        </a>
      </div>
    </div>
    <div class="about-paragraph">
      <p>{{ lang.getTranslation(fgLanguage, "donationText_p1") }}</p>
      <p>{{ lang.getTranslation(fgLanguage, "donationText_p1_1") }}</p>
      <p>{{ lang.getTranslation(fgLanguage, "donationText_p1_2") }}</p>
      <p>{{ lang.getTranslation(fgLanguage, "donationText_p1_3") }}</p>
      <p>{{ lang.getTranslation(fgLanguage, "donationText_p1_4") }}</p>
      <p>{{ lang.getTranslation(fgLanguage, "donationText_p1_5") }}</p>
      <p>{{ lang.getTranslation(fgLanguage, "donationText_p1_6") }}</p>
    </div>
    <div class="about-paragraph">
      <p>{{ lang.getTranslation(fgLanguage, "donationText_p2") }}</p>
    </div>
    <div class="donation">
      <h2>{{ lang.getTranslation(fgLanguage, "donation") }}</h2>
      <p>
        {{ lang.getTranslation(fgLanguage, "donationText") }}
      </p>
      <div class="donation-item">
        <a href="https://www.paypal.com/">
          <img src="/assets/icons/icons8-paypal-48.png" alt="paypal" />
          <span>PayPal</span>
        </a>
        <a href="https://www.patreon.com/">
          <img src="/assets/icons/icons8-patreon-48.png" alt="patreon" />
          <span>Patreon</span>
        </a>
        <a href="https://www.buymeacoffee.com/">
          <img src="/assets/icons/icons8-coffee-to-go-48.png" alt="coffee" />
          <span>Buy me a coffee</span>
        </a>
      </div>
    </div>
    <div class="about-paragraph">
      <p>{{ lang.getTranslation(fgLanguage, "donationText_p3_1") }}</p>
      <p>{{ lang.getTranslation(fgLanguage, "donationText_p3_2") }}</p>
    </div>
    <div class="about-paragraph">
      <p>{{ lang.getTranslation(fgLanguage, "aboutText_p4") }}</p>
      <p><b>Keresztes Zsolt</b></p>
    </div>
  </div>
  <hr />
  <div class="about-paragraph thanks">
    <p>© 2023 - Keresztes Zsolt</p>
    <p>Free Software. Opensource.</p>
  </div>
  <div class="about-paragraph thanks">
    <p>
      {{ lang.getTranslation(fgLanguage, "aboutText_thanks_stock_photos") }}
    </p>
    <a
      href="https://pixabay.com/photos/focalizare-a-inspira-inspira%C8%9Bie-5519780/"
    >
      "Focus"
    </a>
    by
    <a href="https://pixabay.com/users/homegrounds-18055885/">Homegrounds</a>
    from Pixabay
  </div>
  <div class="about-paragraph thanks">
    <p>
      {{ lang.getTranslation(fgLanguage, "aboutText_thanks_stock_icons") }}
    </p>
    <div>
      <a target="_blank" href="https://icons8.com/icon/19318/youtube"
        >YouTube</a
      >
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
    <div>
      <a target="_blank" href="https://icons8.com/icon/32323/instagram"
        >Instagram</a
      >
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
    <div>
      <a target="_blank" href="https://icons8.com/icon/13912/facebook"
        >Facebook</a
      >
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
    <div>
      <a target="_blank" href="https://icons8.com/icon/xuvGCOXi8Wyg/linkedin"
        >LinkedIn</a
      >
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
    <div>
      <a target="_blank" href="https://icons8.com/icon/13963/twitter"
        >Twitter</a
      >
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
    <div>
      <a target="_blank" href="https://icons8.com/icon/fmFqQmR0UdsR/github"
        >GitHub</a
      >
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
    <div>
      <a target="_blank" href="https://icons8.com/icon/118640/tiktok">TikTok</a>
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
  </div>
  <div class="about-paragraph thanks">
    <p>
      {{ lang.getTranslation(fgLanguage, "aboutText_thanks_crash_course") }}
    </p>
    <a href="https://youtu.be/kYl271X2LNA">https://youtu.be/kYl271X2LNA</a>
  </div>
</template>

<style scoped lang="scss">
@import "../../scss/common.scss";

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.thanks {
  margin-bottom: 0.5rem;
}
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  .about-paragraph {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: left;
    arrange-items: left;
    text-align: left;
  }

  p {
    width: 100%;
    text-align: left;
    justify-content: left;
    text-indent: 1em;
    margin-bottom: 0.25rem;
  }

  .social-media-links {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;

    .social-media-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0.5rem;

      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        color: $fg-primary-color;

        img {
          width: 3rem;
          height: 3rem;
        }

        span {
          margin-top: 0.5rem;
        }
      }
    }
  }

  .donation {
    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      text-align: center;
    }

    .donation-item {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;

      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        color: $fg-primary-color;
        margin: 0.5rem;

        img {
          width: 3rem;
          height: 3rem;
        }

        span {
          margin-top: 0.5rem;
        }
      }
    }
  }
}
</style>
