import { Dropdown, MenuButton, Menu, MenuItem } from "@mui/joy"

export default function DropdownNumbers({ maxLength, step, onChange, title="Teams per page" }) {


    return (
        <div style={{ display: 'flex', marginTop: "20px", alignItems: 'center', justifyContent: 'center' }}>
            <Dropdown>
                <MenuButton> {title} </MenuButton>
                <Menu >
                    <MenuItem onClick={() => onChange(1)}>1</MenuItem>
                    {
                        Array.from({ length: maxLength }).map((_, index) => {
                            if ((index + 1) % step === 0 && index !== 0)
                                return <MenuItem onClick={() => onChange(index + 1)} key={index}>{index + 1}</MenuItem>
                        }
                        )
                    }
                </Menu>
            </Dropdown>
        </div>
    )
}