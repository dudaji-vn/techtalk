interface IScoreIconProps {
  type?: "outline" | "fill";
}
const ScoreIcon = (props: IScoreIconProps) => {
  const { type } = props;

  const icon: Record<"outline" | "fill", JSX.Element> = {
    outline: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.84003 7.3476V10.6609C2.84003 11.8743 2.84003 11.8743 3.98669 12.6476L7.14003 14.4676C7.61336 14.7409 8.38669 14.7409 8.86003 14.4676L12.0134 12.6476C13.16 11.8743 13.16 11.8743 13.16 10.6609V7.3476C13.16 6.13427 13.16 6.13427 12.0134 5.36094L8.86003 3.54094C8.38669 3.2676 7.61336 3.2676 7.14003 3.54094L3.98669 5.36094C2.84003 6.13427 2.84003 6.13427 2.84003 7.3476Z"
          stroke="#6B7280"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.6666 5.08732V3.33398C11.6666 2.00065 11 1.33398 9.66665 1.33398H6.33331C4.99998 1.33398 4.33331 2.00065 4.33331 3.33398V5.04065"
          stroke="#6B7280"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.42 7.32664L8.8 7.91997C8.86 8.01331 8.99333 8.10664 9.09333 8.13331L9.77333 8.30664C10.1933 8.41331 10.3067 8.77331 10.0333 9.10664L9.58666 9.64664C9.52 9.73331 9.46666 9.88664 9.47333 9.99331L9.51333 10.6933C9.54 11.1266 9.23333 11.3466 8.83333 11.1866L8.18 10.9266C8.08 10.8866 7.91333 10.8866 7.81333 10.9266L7.16 11.1866C6.76 11.3466 6.45333 11.12 6.48 10.6933L6.52 9.99331C6.52666 9.88664 6.47333 9.72664 6.40666 9.64664L5.96 9.10664C5.68666 8.77331 5.8 8.41331 6.22 8.30664L6.9 8.13331C7.00666 8.10664 7.14 8.00664 7.19333 7.91997L7.57333 7.32664C7.81333 6.96664 8.18666 6.96664 8.42 7.32664Z"
          stroke="#6B7280"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    fill: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.8417 4.57435V5.19102L11.8917 3.48268C10.775 2.84102 9.21666 2.84102 8.10832 3.48268L5.15833 5.19935V4.57435C5.15833 2.69935 6.18333 1.66602 8.05833 1.66602H11.9417C13.8167 1.66602 14.8417 2.69935 14.8417 4.57435Z"
          fill="#34D399"
        />
        <path
          d="M14.8666 6.64089L14.75 6.58255L13.6166 5.93255L11.2666 4.57422C10.55 4.15755 9.44996 4.15755 8.73329 4.57422L6.38329 5.92422L5.24996 6.59089L5.09996 6.66589C3.64163 7.64922 3.54163 7.83255 3.54163 9.40755V13.1742C3.54163 14.7492 3.64163 14.9326 5.13329 15.9409L8.73329 18.0159C9.09163 18.2326 9.54163 18.3242 9.99996 18.3242C10.45 18.3242 10.9083 18.2242 11.2666 18.0159L14.9 15.9159C16.3666 14.9326 16.4583 14.7576 16.4583 13.1742V9.40755C16.4583 7.83255 16.3583 7.64922 14.8666 6.64089ZM12.325 11.2492L11.8166 11.8742C11.7333 11.9659 11.675 12.1409 11.6833 12.2659L11.7333 13.0659C11.7666 13.5576 11.4166 13.8076 10.9583 13.6326L10.2166 13.3326C10.1 13.2909 9.90829 13.2909 9.79163 13.3326L9.04996 13.6242C8.59163 13.8076 8.24163 13.5492 8.27496 13.0576L8.32496 12.2576C8.33329 12.1326 8.27496 11.9576 8.19163 11.8659L7.67496 11.2492C7.35829 10.8742 7.49996 10.4576 7.97496 10.3326L8.74996 10.1326C8.87496 10.0992 9.01663 9.98255 9.08329 9.88255L9.51663 9.21589C9.78329 8.79922 10.2083 8.79922 10.4833 9.21589L10.9166 9.88255C10.9833 9.99089 11.1333 10.0992 11.25 10.1326L12.025 10.3326C12.5 10.4576 12.6416 10.8742 12.325 11.2492Z"
          fill="#34D399"
        />
      </svg>
    ),
  };
  if (!type) {
    return icon["fill"];
  }
  return icon[type];
};

export default ScoreIcon;
