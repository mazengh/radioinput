import { mount } from "@vue/test-utils";
import RadioGroup from "@/components/RadioGroup.vue";

function createTestProps(props) {
  return {
    checkedIndex: 2,
    labelId: "group_label",
    labelText: "Select Burger",
    radios: [
      {
        value: "r1",
        label: "Regular Burger"
      },
      {
        value: "r2",
        label: "Cheese Burger"
      },
      {
        value: "r3",
        label: "Chicken Burger"
      },
      {
        value: "r4",
        label: "Mushroom Burger"
      }
    ],
    ...props
  };
}

let wrapper, props;

describe("RadioGroup.vue rendering", () => {
  // test rendering with default(checkedIndex) set
  it("will render a radio group with 4 radios with default checked", () => {
    let radioVal = null;
    props = {
      ...createTestProps({ vModel: radioVal })
    };

    wrapper = mount(RadioGroup, {
      propsData: {
        ...props
      }
    });

    // rendered element should have role="radiogroup" attribute
    expect(wrapper.find('[role="radiogroup"]').is('[role="radiogroup"]')).toBe(
      true
    );

    // rendered element should have aria-labelledby attribute set to the label id
    expect(wrapper.attributes("aria-labelledby")).toBe(props.labelId);

    // number of rendered radios should match radios data array length
    expect(wrapper.findAll('[role="radio"]').length).toEqual(4);

    // value of radiogroup should be the value of the default checked radio
    expect(wrapper.vm.currentRadioValue).toEqual(
      props.radios[props.checkedIndex].value
    );
  });

  // test rendering with no default(checkedIndex) set
  it("will render a radio group with 4 radios with none being checked", () => {
    let radioVal = null;
    props = {
      ...createTestProps({ vModel: radioVal, checkedIndex: -1 })
    };

    wrapper = mount(RadioGroup, {
      propsData: {
        ...props
      }
    });

    // value of radiogroup should be null as no radio is checked
    expect(wrapper.vm.currentRadioValue).toBeNull();
  });
});
