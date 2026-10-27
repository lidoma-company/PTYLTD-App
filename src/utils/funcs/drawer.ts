export const closeDrawer = (id: string) => {
    const drawerInput = document.getElementById(id) as HTMLInputElement;
    if (drawerInput) drawerInput.checked = false;
};
