<template>
  <div
    role="radio"
    :aria-checked="radioAriaChecked"
    :aria-disabled="disabled"
    :aria-label="radioAriaLabel"
    :tabindex="radioTabIndex"
    :class="classList"
    @keydown.prevent.stop.up.down.left.right.space.enter="handleKeyDown"
    @click="handleClick()"
    @focus="handleFocus()"
    @blur="handleBlur()"
  >
    <div v-if="label" class="label">{{ radioLabel }}</div>
  </div>
</template>

<script>
export default {
  name: "Radio",
  props: {
    index: {
      type: Number
    },
    checked: {
      type: Number,
      default: -1
    },
    // position of radio input relative to it's label
    position: {
      type: String,
      default: "beforeLabel",
      validator: function(value) {
        // The value must match one of these strings
        return (
          ["beforeLabel", "afterLabel", "aboveLabel", "belowLabel"].indexOf(
            value
          ) !== -1
        );
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: String,
    value: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      radioIndex: this.index,
      radioLabel: this.label,
      radioFocus: false,
      keyCode: Object.freeze({
        RETURN: 13,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      })
    };
  },
  computed: {
    radioAriaChecked() {
      return this.isAriaChecked ? "true" : "false";
    },
    classList() {
      return [
        this.disabled ? "disabled" : null,
        this.radioFocus ? "focus" : null,
        this.position
      ];
    },
    // when no label is supplied, aria-label attribute is set on the radio
    // to support web accessibility.
    radioAriaLabel() {
      return !this.label ? this.value : null;
    },
    isAriaChecked() {
      return this.radioIndex === this.checked;
    },
    radioTabIndex() {
      return this.radioIndex === this.checked ||
        (this.checked === -1 && this.radioIndex === 0)
        ? "0"
        : "-1";
    }
  },
  watch: {
    checked() {
      if (this.radioIndex === this.checked) {
        this.$el.focus();
        this.$emit("check", { index: this.radioIndex, value: this.value });
      }
    }
  },
  methods: {
    handleFocus() {
      if (!this.disabled && !this.classList.includes("focus")) {
        this.radioFocus = true;
      }
    },
    handleBlur() {
      if (!this.disabled && this.classList.includes("focus")) {
        this.radioFocus = false;
      }
    },
    handleKeyDown(event) {
      switch (event.keyCode) {
        case this.keyCode.SPACE:
        case this.keyCode.RETURN:
          this.$emit("check", { index: this.radioIndex, value: this.value });
          break;
        case this.keyCode.UP:
        case this.keyCode.LEFT:
          this.$emit("previous");
          break;
        case this.keyCode.DOWN:
        case this.keyCode.RIGHT:
          this.$emit("next");
          break;
        default:
          break;
      }
    },
    handleClick() {
      !this.disabled &&
        this.$emit("check", {
          index: this.radioIndex,
          value: this.value
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// used focused border color  and active radio background
$green-1: rgb(110, 190, 110);

// used for hover
$green-2: rgb(228, 241, 228);

// used for active radio
$green-3: rgba(228, 241, 228, 0.2);

// used for disabled radio color
$grey-1: rgba(0, 0, 0, 0.35);

// used for radio inner shadow
$grey-2: #ebebeb;

// used for label color
$grey-3: darkgray;

[role="radio"] {
  display: inline-flex;
  margin: 0.5em;
  padding: 0.15em 0.3em;
  border: 2px solid transparent;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  cursor: context-menu;
  outline: none;

  &.disabled,
  &.disabled:hover {
    background-color: transparent;
    color: $grey-1;

    &:focus {
      border-color: transparent;
    }
  }

  &.focus {
    border-color: $green-1;
    background-color: $green-3;
  }

  &[aria-checked="true"] {
    &.beforeLabel:before,
    &.afterLabel:after,
    &.aboveLabel:before,
    &.belowLabel:after {
      box-shadow: inset 0px 0px 0px 4px $green-1;
    }
  }

  &:hover {
    background-color: $green-2;
  }

  &[aria-checked="false"] {
    &:hover {
      &.beforeLabel:before,
      &.afterLabel:after,
      &.aboveLabel:before,
      &.belowLabel:after {
        box-shadow: none;
        background-color: #fff;
      }
    }
    &.disabled:hover {
      &.beforeLabel:before,
      &.afterLabel:after,
      &.aboveLabel:before,
      &.belowLabel:after {
        box-shadow: inset 0 4px 3px 0px $grey-2;
      }
    }
  }

  &.beforeLabel:before,
  &.afterLabel:after,
  &.aboveLabel:before,
  &.belowLabel:after {
    content: "";
    display: block;
    width: 14px;
    height: 14px;
    border: 1px solid $grey-3;
    border-radius: 100%;
    box-shadow: inset 0 4px 3px 0px #ebebeb;
  }

  &.beforeLabel,
  &.afterLabel {
    flex-direction: row;
  }

  &.aboveLabel,
  &.belowLabel {
    flex-direction: column;
  }

  &.beforeLabel {
    div.label {
      margin: 3px 0px 3px 5px;
    }
  }

  &.afterLabel {
    div.label {
      margin: 3px 5px 3px 0px;
    }
  }

  &.aboveLabel {
    div.label {
      margin: 3px 3px 0px 3px;
    }
  }

  &.belowLabel {
    div.label {
      margin: 0px 3px 3px 3px;
    }
  }
}
</style>
