# Take Home Assignment for Edited

## What I've used

- Vite - as far as I've understood from the call, the company uses it ATM, so I've decided to stick with it
- React
- Typescript - if there's an option to use Typescript, I alwasy prefer to use Typescript
- CSS - I didn't saw a need to use any preprocessor or CSS library here, the styles are quite basic and there's no need in them IMO
- Classnames - just a convenient tool for dynamic CSS classes I'm used to, used it for Input validation styling mostly
- MSW - to mock API calls

## How to run

Clone the repo

Run

```
yarn

yarn dev
```

## What I think could be improved

1. I would prefer to extract colors to CSS variables, but decided to stick with the current approach to fit within the proposed in the task time limits
2. I think I could've used more structured names for my CSS classes. TBH I didn't thought about it much because I've tried to fit in the proposed time limits
3. Instead of relying on the `loggedInUser` state in App.tsx I could have implemented a proper routing and made sure that `LoggedInToast` route is inaccesible to the unathenticated users. Again, decided not to got this route because of the time constraints
4. I'm not a fan of hardcoded `px` values in the styles. Some of the components had weird paddings (like `50px` on the left and `51px` on the right), Not sure whether this was intentional, so decided to stick with hardcoded `px` values in styles.
