export default function getPositionText(position: string): string {
    if (isNaN(parseFloat(position)) && isNaN(+position)) {
        if (position === "R") return "DNF"
        if (position === "D") return "DSQ"
        if (position === "E") return "Excluded"
        if (position === "W") return "Withdrawn"
        if (position === "N") return "Not classified"
    }
    return position;
}