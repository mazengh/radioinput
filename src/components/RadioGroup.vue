<template>
  <div role="radiogroup" :aria-labelledby="radioLabelId" @click="handleInput">
    <h3 :id="radioLabelId">{{radioLabelText}}</h3>
    <Radio
      v-for="(radio, index) in radios"
      v-bind="radio"
      :key="`radio_${index}`"
      :checked="currentRadioIndex"
      :index="indexInGroup(index)"
      @check="setChecked"
      @previous="setCheckedToPreviousItem"
      @next="setCheckedToNextItem"
    />
  </div>
</template>

<script>
import Radio from "./Radio.vue";

export default {
  props: {
    labelId: String,
    labelText: String,
    value: {
      type: null
    },
    checkedIndex: {
      type: Number,
      default: -1,
      validator: function(value) {
        return value >= -1;
      }
    },
    radios: {
      type: Array
    }
  },
  model: {
    prop: "value",
    event: "click"
  },
  name: "RadioGroup",
  components: {
    Radio
  },
  data: function() {
    return {
      currentRadioIndex: this.checkedIndex >= 0 ? this.checkedIndex : -1,
      currentRadioValue: this.value ? this.value : null,
      totalRadios: 0,
      radioLabelId: this.labelId,
      radioLabelText: this.labelText,
      radiosInGroup: Map
    };
  },
  methods: {
    setChecked: function(payload) {
      this.currentRadioIndex = payload.index;
      this.currentRadioValue = payload.value;
      this.handleInput();
    },
    setCheckedToPreviousItem: function() {
      if (this.currentRadioIndex <= 0) {
        this.currentRadioIndex = this.totalRadios - 1;
      } else {
        this.currentRadioIndex -= 1;
      }
    },
    setCheckedToNextItem: function() {
      const startIndex =
        this.currentRadioIndex === -1 ? 0 : this.currentRadioIndex;

      this.currentRadioIndex = (startIndex + 1) % this.totalRadios;
    },
    handleInput: function() {
      this.$emit("click", this.currentRadioValue);
    },
    indexInGroup(index) {
      return this.radiosInGroup.get(index.toString());
    }
  },
  created() {
    // initialize the index of the active radios
    // disabled radios index is set to null
    // enabled radios are index by order starting at 0
    this.radiosInGroup = new Map();
    let radioIndex = 0;
    this.radios.forEach((radio, index) => {
      if (!radio.disabled) {
        this.radiosInGroup.set(index.toString(), radioIndex++);
      } else {
        this.radiosInGroup.set(index.toString(), null);
      }
    });
  },
  beforeMount() {
    const activeRadios = this.radios.filter(radio => !radio.disabled);

    activeRadios.forEach((radio, index) => {
      // if the value of the radio group matched the value of the
      // current radio, set the current active Radio index to the
      // index of the radio
      if (this.value === radio.value) {
        this.currentRadioIndex = index;
      }
      // if no value is set on the radio group and the default
      // checked index is set and it is equal to the radio index,
      // set the current radio group value to the radio value
      else if (
        this.checkedIndex >= 0 &&
        radio.value &&
        this.checkedIndex === index
      ) {
        this.currentRadioValue = radio.value;
        this.handleInput();
      }
    });

    this.totalRadios = activeRadios.length;
  }
};
</script>

<style lang="scss" scoped>
$green-1: rgb(96, 161, 96);

[role="radiogroup"] {
  padding: 0;
  margin: 0;
  list-style: none;

  &:focus {
    outline: none;
  }

  h3 {
    color: $green-1;
    margin: 0.5em;
  }
}
</style>