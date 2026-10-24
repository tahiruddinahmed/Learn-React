# Context update and useMemo and React.memo

> Key takeaway: useMemo stabilizes the Context value when its dependencies remain unchanged. React.memo can skip renders caused by unchanged props. But a component that consumes a Context still updates when that Context's value changes.