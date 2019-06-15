<template>
  <div role="radiogroup" aria-labelledby="group_label_1" @click="handleInput">
    <h3 id="group_label_1">Pizza Crust</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: null
    },
    checkedIndex: {
      type: Number,
      default: -1,
      validator: function(value) {
        return value >= -1;
      }
    }
  },
  model: {
    prop: "value",
    event: "click"
  },
  name: "RadioGroup",
  data: function() {
    return {
      radioButtons: [],
      //firstButton: null,
      //lastButton: null,
      currentRadioIndex: 0, //this.checkedIndex > -1 ? this.checkedIndex : 0,
      initialCheckedRadio: this.checkedIndex,
      currentRadioValue: null
    };
  },
  // computed: {
  //   currentRadioValue: function() {
  //     return this.radioButtons.length && this.initialCheckedRadio > -1
  //       ? this.radioButtons[this.currentRadioIndex].value
  //       : "";
  //   }
  //},
  methods: {
    setChecked: function(currentRadio = null) {
      if (!currentRadio) {
        currentRadio = this.radioButtons[this.currentRadioIndex];
      } else {
        // set the current radio index to the passed param
        this.currentRadioIndex = this.radioButtons.indexOf(currentRadio);
      }

      // rest attributes on all radios in group
      this.radioButtons.forEach(radioBtn => {
        radioBtn.setAriaChecked(false);
        radioBtn.setRadioTabIndex("-1");
      });

      this.currentRadioValue = this.radioButtons[this.currentRadioIndex].value;
      currentRadio.setAriaChecked(true);
      currentRadio.setRadioTabIndex("0");
      currentRadio.$el.focus();
      this.handleInput();
    },
    setCheckedToPreviousItem: function() {
      // if (this.currentRadioIndex === 0) {
      //   this.currentRadioIndex = this.radioButtons.length - 1;
      // } else {
      //   this.currentRadioIndex = this.currentRadioIndex - 1;
      // }

      const radioCount = this.radioButtons.length;
      this.currentRadioIndex =
        Math.floor((radioCount - this.currentRadioIndex) / radioCount) *
          radioCount +
        this.currentRadioIndex -
        1;

      this.setChecked();
    },
    setCheckedToNextItem: function() {
      this.currentRadioIndex =
        (this.currentRadioIndex + 1) % this.radioButtons.length;

      this.setChecked();
    },
    isCurrentRadioActive: function() {
      this.radioButtons.length
        ? this.radioButtons[this.currentRadioIndex].value
        : "";
    },
    handleInput: function() {
      this.$emit("click", this.currentRadioValue);
    }
  },
  mounted() {
    this.radioButtons = this.$children.filter(
      radioBtn => !radioBtn.isAriaDisabled
    );

    //const currentRadio = this.radioButtons[this.currentRadioIndex];
    if (this.initialCheckedRadio >= 0) {
      this.currentRadioIndex = this.initialCheckedRadio;
      this.setChecked();

      // reset the initial check so that it only runs once at first
      this.initialCheckedRadio = -1;
    }

    // set tabindex to 0 for the first radio in the group
    else if (this.radioButtons.length) {
      this.radioButtons[this.currentRadioIndex].setRadioTabIndex("0");
      // this.currentRadioIndex !== -1
      //   ? this.radioButtons[this.currentRadioIndex].setRadioTabIndex("0")
      //   : this.radioButtons[0].setRadioTabIndex("0");
    }
  }
};
</script>

<style lang="scss" scoped>
[role="radiogroup"] {
  padding: 0;
  margin: 0;
  list-style: none;

  &:focus {
    outline: none;
  }
}
</style>