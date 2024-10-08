import { IconName } from "@/components/icons/helper";
import { coffeeAddress } from "@/web3/contracts/abi/buymecoffee";

export const Projects = [
    {
        name: "Counter",
        description: "A simple counter smart contract",
        icon:"counter" as IconName,
        href:"/counter",
    },
    {
        name: "Buy Me Coffee",
        description: "A simple smart contract to buy me coffee",
        icon:"coffee" as IconName,
        href:`/buymecoffee/${coffeeAddress}`,
    },
    {
        name: "Create",
        description: "Create your own buy me coffee page",
        icon:"coffeeFactory" as IconName,
        href:"/buymecoffee",
    },
    {
        name: "Start Fundme",
        description: "Start your own Fundm campaign",
        icon:"fundMe" as IconName,
        href:"/fundme",
    },{
        name: "My Fundme",
        description: "My Fundme campaign",
        icon:"fundMe" as IconName,
        href:"/fundme/0x13D6c61F836C460f155E56bD0c74c2008560c17F",
    }
]