export const getBadgeColor = (num: number): string => {
    switch (true) {
        case (num >= 0 && num <= 10):
            return "#FF0000";
        case (num >= 11 && num <= 40):
            return "#FF9B3F";
        case (num >= 41 && num <= 70):
            return "#FFC71C";
        default:
            return "#8FE04E";
    }
}
