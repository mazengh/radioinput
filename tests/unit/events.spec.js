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

afterEach(() => {
  wrapper.destroy();
});

// describe("RadioGroup.vue rendering with default checked radio", () => {
//   // test rendering with default(checkedIndex) set
//   it("will render a radio group with 4 radios with default checked", () => {
//     let radioVal = null;
//     props = {
//       ...createTestProps({ vModel: radioVal })
//     };

//     wrapper = mount(RadioGroup, {
//       propsData: {
//         ...props
//       }
//     });

//     // rendered element should have role="radiogroup" attribute
//     expect(wrapper.find('[role="radiogroup"]').is('[role="radiogroup"]')).toBe(
//       true
//     );

//     // rendered element should have aria-labelledby attribute set to the label id
//     expect(wrapper.attributes("aria-labelledby")).toBe(props.labelId);

//     // number of rendered radios should match radios data array length
//     expect(wrapper.findAll('[role="radio"]').length).toEqual(4);

//     // value of radiogroup should be the value of the default checked radio
//     expect(wrapper.vm.currentRadioValue).toEqual(
//       props.radios[props.checkedIndex].value
//     );
//   });
// });

describe("RadioGroup.vue rendering with no default checked radio", () => {
  // test rendering with default(checkedIndex) set
  it("will render a radio group with 4 radios with none being checked", () => {
    let radioVal = null;
    props = {
      ...createTestProps({ vModel: radioVal, checkedIndex: -1 })
    };

    wrapper = mount(RadioGroup, {
      propsData: {
        ...props
      },
      attachToDocument: true
    });

    // when no radios are checked currentRadioIndex should be -1
    expect(wrapper.vm.currentRadioIndex).toBe(-1);

    // if a radio is clicked, the currentRadioIndex should be set to the radio index
    const radio = wrapper.find('[role="radio"]');

    radio.trigger("keydown.space");
    expect(wrapper.vm.currentRadioIndex).toBe(0);

    radio.trigger("keydown.down");
    expect(wrapper.vm.currentRadioIndex).toBe(1);

    radio.trigger("keydown.right");
    expect(wrapper.vm.currentRadioIndex).toBe(2);

    radio.trigger("keydown.up");
    expect(wrapper.vm.currentRadioIndex).toBe(1);

    radio.trigger("keydown.left");
    expect(wrapper.vm.currentRadioIndex).toBe(0);

    radio.trigger("click");
    //radio.vm.handleClick();
    expect(wrapper.vm.currentRadioIndex).toBe(0);
    expect(wrapper.vm.currentRadioValue).toBe(props.radios[0].value);
    expect(radio.emitted().check).toBeTruthy();

    // check default case in switch as we don't handle escape key
    expect(wrapper.vm.currentRadioIndex).toBe(0);
    radio.trigger("keydown.esc");
    expect(wrapper.vm.currentRadioIndex).toBe(0);

    // test focusing radio
    radio.trigger("focus");
    expect(radio.vm.classList).toEqual(expect.arrayContaining(["focus"]));

    // triggering focus a second time doesn't cause any changes
    radio.trigger("focus");
    expect(radio.vm.classList).toEqual(expect.arrayContaining(["focus"]));

    // test bluring radio
    radio.trigger("blur");
    expect(radio.vm.classList).not.toEqual(expect.arrayContaining(["focus"]));

    // triggering focus a second time doesn't cause any changes
    radio.trigger("blur");
    expect(radio.vm.classList).not.toEqual(expect.arrayContaining(["focus"]));

    //expect(radio.attributes("aria-checked")).toBe("true");

    //let input = wrapper.find('input').element
    //expect(radio.element).toBe(document.activeElement);
    //console.log(radio.element);

    // expect(radios.at(0).attributes("aria-checked")).toBe("false");
    //expect(radios.at(0).classes()).toContain("focus");

    // value of radiogroup should be null as no radio is checked
    //expect(wrapper.vm.currentRadioValue).toBeNull();
  });

  // test rendering with no default set and moving to precious radio
  it("will testing moving to previous radio when no radios are checked", () => {
    let radioVal = null;
    props = {
      ...createTestProps({ vModel: radioVal, checkedIndex: -1 })
    };

    wrapper = mount(RadioGroup, {
      propsData: {
        ...props
      }
    });

    const radio = wrapper.find('[role="radio"]');

    // when at first index and moving left the selected index should be the last
    radio.trigger("keydown.left");
    expect(wrapper.vm.currentRadioIndex).toBe(props.radios.length - 1);

    // when at last index and moving right the selected index should be the first
    radio.trigger("keydown.right");
    expect(wrapper.vm.currentRadioIndex).toBe(0);
  });

  // test rendering with no default set and moving to next radio
  it("will testing moving to next radio when no radios are checked", () => {
    let radioVal = null;
    props = {
      ...createTestProps({ vModel: radioVal, checkedIndex: -1 })
    };

    wrapper = mount(RadioGroup, {
      propsData: {
        ...props
      }
    });

    const radio = wrapper.find('[role="radio"]');

    // when at first index and moving right the selected index should be the 2nd radio
    radio.trigger("keydown.right");
    expect(wrapper.vm.currentRadioIndex).toBe(1);

    // when at last index and moving right the selected index should be the first
    //radio.trigger("keydown.right");
    //expect(wrapper.vm.currentRadioIndex).toBe(0);
  });
});
