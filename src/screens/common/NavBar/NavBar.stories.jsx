import { NavBar, ActiveNavBarButton } from "./NavBar";

export default {
    title: "common/NavBar",
    component: NavBar
}

const template = args => <NavBar {...args} />

export const Primary = template.bind({})
Primary.args = {
    activeButton: ActiveNavBarButton.RECIPES
}