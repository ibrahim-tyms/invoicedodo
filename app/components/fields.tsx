"use client";

/**
 * Shared form fields. One height, one border, one focus ring for every control:
 * text, textarea (auto-grows), number, money (currency symbol + formatting) and a
 * searchable select (listbox) used for currency, country, terms and anything else.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { countries, currencies, currencyDecimals, currencySymbol, POPULAR_COUNTRIES, POPULAR_CURRENCIES } from "../lib/locale-data";

/* ---------------------------------------------------------------- Field */

type FieldIds = { id: string; labelId: string; describedBy?: string; invalid: boolean };
const FieldContext = createContext<FieldIds | null>(null);

function useFieldIds(): FieldIds {
  const ctx = useContext(FieldContext);
  const fallback = useId();
  return ctx ?? { id: fallback, labelId: `${fallback}-label`, invalid: false };
}

export function Field({
  label,
  hint,
  error,
  optional,
  className,
  children,
}: {
  label: ReactNode;
  hint?: ReactNode;
  error?: string | null;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const base = useId();
  const msgId = `${base}-msg`;
  const ids: FieldIds = {
    id: base,
    labelId: `${base}-label`,
    describedBy: error || hint ? msgId : undefined,
    invalid: !!error,
  };
  return (
    <div className={`f-field${className ? ` ${className}` : ""}`} data-invalid={error ? "" : undefined}>
      <label id={ids.labelId} htmlFor={ids.id} className="f-label">
        <span>{label}</span>
        {optional && <span className="f-label-opt">Optional</span>}
      </label>
      <FieldContext.Provider value={ids}>{children}</FieldContext.Provider>
      {error ? (
        <p id={msgId} className="f-error">
          {error}
        </p>
      ) : hint ? (
        <p id={msgId} className="f-hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------- Text */

export function TextInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  const f = useFieldIds();
  return (
    <input
      id={f.id}
      aria-describedby={f.describedBy}
      aria-invalid={f.invalid || undefined}
      className={`f-control${className ? ` ${className}` : ""}`}
      {...rest}
    />
  );
}

/** Textarea that grows with its content (between `minRows` and `maxRows`). */
export function TextArea({
  className,
  minRows = 2,
  maxRows = 12,
  value,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { minRows?: number; maxRows?: number }) {
  const f = useFieldIds();
  const ref = useRef<HTMLTextAreaElement>(null);

  const fit = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const cs = getComputedStyle(el);
    const line = parseFloat(cs.lineHeight) || 20;
    const chrome = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
    el.style.height = "auto";
    const max = line * maxRows + chrome;
    const next = Math.min(Math.max(el.scrollHeight + parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth), line * minRows + chrome), max);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight + chrome > max + 1 ? "auto" : "hidden";
  }, [minRows, maxRows]);

  useLayoutEffect(fit, [value, fit]);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    let w = el.clientWidth;
    const ro = new ResizeObserver(() => {
      if (el.clientWidth !== w) {
        w = el.clientWidth;
        fit();
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [fit]);

  return (
    <textarea
      ref={ref}
      id={f.id}
      rows={minRows}
      aria-describedby={f.describedBy}
      aria-invalid={f.invalid || undefined}
      className={`f-control f-textarea${className ? ` ${className}` : ""}`}
      value={value}
      {...rest}
    />
  );
}

/* ---------------------------------------------------------------- Number + Money */

const parseNum = (s: string) => {
  const n = parseFloat(s.replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

type NumberInputProps = {
  value: number;
  onValue: (n: number) => void;
  /** Most decimals allowed. */
  decimals?: number;
  /** Always show `decimals` places when not editing (money). */
  fixed?: boolean;
  /** Thousands separators when not editing. */
  group?: boolean;
  step?: number;
  min?: number;
  max?: number;
  prefix?: ReactNode;
  suffix?: ReactNode;
  align?: "left" | "right";
  placeholder?: string;
  showZero?: boolean;
  className?: string;
  "aria-label"?: string;
};

/** Number field: type freely, arrows step, paste "$1,234.50", formatted on blur. */
export function NumberInput({
  value,
  onValue,
  decimals = 2,
  fixed = false,
  group = false,
  step = 1,
  min = 0,
  max = 1e12,
  prefix,
  suffix,
  align = "left",
  placeholder,
  showZero = false,
  className,
  ...rest
}: NumberInputProps) {
  const f = useFieldIds();
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState<string | null>(null);

  const fmt = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: fixed ? decimals : 0,
        maximumFractionDigits: decimals,
        useGrouping: group,
      }),
    [decimals, fixed, group],
  );
  const clamp = (n: number) => {
    const p = 10 ** decimals;
    return Math.min(Math.max(Math.round(n * p) / p, min), max);
  };
  const shown = editing ?? (value || showZero ? fmt.format(value || 0) : "");

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const by = (e.shiftKey ? 10 : 1) * step * (e.key === "ArrowUp" ? 1 : -1);
    const next = clamp((parseNum(editing ?? String(value)) || 0) + by);
    onValue(next);
    setEditing(String(next));
  };

  return (
    <div
      className={`f-control f-affix${className ? ` ${className}` : ""}`}
      data-align={align}
      onMouseDown={(e) => {
        if (e.target !== inputRef.current) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }}
    >
      {prefix != null && <span className="f-prefix" aria-hidden="true">{prefix}</span>}
      <input
        ref={inputRef}
        id={f.id}
        className="f-bare"
        inputMode={decimals > 0 ? "decimal" : "numeric"}
        autoComplete="off"
        aria-describedby={f.describedBy}
        aria-invalid={f.invalid || undefined}
        placeholder={placeholder ?? fmt.format(0)}
        value={shown}
        onFocus={(e) => {
          setEditing(value ? String(value) : "");
          const el = e.currentTarget;
          requestAnimationFrame(() => el.select());
        }}
        onChange={(e) => {
          // Keep digits, one dot, and nothing else; respect the decimal limit.
          let t = e.target.value.replace(/,/g, "").replace(min < 0 ? /[^0-9.\-]/g : /[^0-9.]/g, "");
          const [whole, ...rest] = t.split(".");
          t = rest.length ? `${whole}.${rest.join("").slice(0, decimals)}` : whole;
          if (decimals === 0) t = whole;
          setEditing(t);
          onValue(clamp(parseNum(t)));
        }}
        onBlur={() => {
          if (editing != null) onValue(clamp(parseNum(editing)));
          setEditing(null);
        }}
        onKeyDown={onKeyDown}
        {...rest}
      />
      {suffix != null && <span className="f-suffix">{suffix}</span>}
    </div>
  );
}

/** Money field: currency symbol in front, the right number of decimals for that currency, grouped on blur. */
export function MoneyInput({ currency, ...rest }: Omit<NumberInputProps, "prefix" | "decimals" | "fixed" | "group"> & { currency: string }) {
  return <NumberInput {...rest} prefix={currencySymbol(currency)} decimals={currencyDecimals(currency)} fixed group align={rest.align ?? "right"} />;
}

/** Two-option toggle that sits inside a field (e.g. discount as % or amount). */
export function InlineToggle<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string; title?: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <span className="f-seg" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          title={o.title}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </span>
  );
}

/* ---------------------------------------------------------------- Select (searchable listbox) */

export type SelectOption = {
  value: string;
  label: string;
  /** Muted text on the right (symbol, code, ...). */
  detail?: string;
  /** Badge or flag before the label. */
  leading?: ReactNode;
  /** Extra words that should match a search. */
  keywords?: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  /** Values pinned in a "Popular" group above the full list. */
  popular?: string[];
  /** Show a search box. Defaults to on when there are more than 8 options. */
  searchable?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  /** Adds a first option that clears the value. */
  emptyLabel?: string;
  allLabel?: string;
  /** What the closed field shows for the chosen option. */
  renderValue?: (o: SelectOption) => ReactNode;
  className?: string;
  "aria-label"?: string;
};

type Row = { kind: "group"; label: string } | { kind: "option"; option: SelectOption; index: number };

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

function score(o: SelectOption, q: string) {
  const v = norm(o.value);
  const l = norm(o.label);
  const k = norm(`${o.keywords ?? ""} ${o.detail ?? ""}`);
  if (v === q || l === q || ` ${k} `.includes(` ${q} `)) return 0;
  if (v.startsWith(q)) return 1;
  if (l.startsWith(q)) return 2;
  if (` ${l} ${k}`.includes(` ${q}`)) return 3;
  if (l.includes(q) || k.includes(q)) return 4;
  return -1;
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const i = norm(text).indexOf(query);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

const Chevron = () => (
  <svg className="f-chev" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Check = () => (
  <svg className="f-opt-check" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export function Select({
  value,
  onChange,
  options,
  popular,
  searchable,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyLabel,
  allLabel = "All",
  renderValue,
  className,
  ...rest
}: SelectProps) {
  const f = useFieldIds();
  const listId = `${f.id}-list`;
  const canSearch = searchable ?? options.length > 8;

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ buf: "", at: 0 });

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [place, setPlace] = useState<{ side: "bottom" | "top"; align: "start" | "end" }>({ side: "bottom", align: "start" });

  const q = norm(query.trim());
  const selected = options.find((o) => o.value === value);
  const empty: SelectOption | null = emptyLabel ? { value: "", label: emptyLabel } : null;

  const rows: Row[] = useMemo(() => {
    const out: Row[] = [];
    let i = 0;
    const push = (o: SelectOption) => out.push({ kind: "option", option: o, index: i++ });
    if (q) {
      options
        .map((o, n) => ({ o, n, s: score(o, q) }))
        .filter((x) => x.s >= 0)
        .sort((a, b) => a.s - b.s || a.n - b.n)
        .forEach((x) => push(x.o));
      return out;
    }
    if (empty) push(empty);
    const pinned = popular?.map((v) => options.find((o) => o.value === v)).filter((o): o is SelectOption => !!o) ?? [];
    if (pinned.length) {
      out.push({ kind: "group", label: "Popular" });
      pinned.forEach(push);
      out.push({ kind: "group", label: allLabel });
    }
    options.forEach(push);
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `empty` is derived from emptyLabel
  }, [q, options, popular, emptyLabel, allLabel]);

  const opts = rows.filter((r): r is Extract<Row, { kind: "option" }> => r.kind === "option");
  const optId = (i: number) => `${listId}-${i}`;

  const openList = (initialQuery = "") => {
    const r = triggerRef.current?.getBoundingClientRect();
    if (r) {
      const below = window.innerHeight - r.bottom;
      setPlace({
        side: below < 340 && r.top > below ? "top" : "bottom",
        align: r.left + Math.max(r.width, 300) > window.innerWidth - 12 ? "end" : "start",
      });
    }
    setQuery(initialQuery);
    setOpen(true);
  };

  const close = (refocus = true) => {
    setOpen(false);
    setQuery("");
    if (refocus) triggerRef.current?.focus();
  };

  const choose = (o: SelectOption) => {
    onChange(o.value);
    close();
  };

  // On open: highlight the current value; focus the search box or the list.
  useLayoutEffect(() => {
    if (!open) return;
    const i = opts.findIndex((r) => r.option.value === value);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- position the highlight when the list opens
    setActive(Math.max(i, 0));
    (canSearch ? searchRef.current : listRef.current)?.focus();
    requestAnimationFrame(() => document.getElementById(optId(Math.max(i, 0)))?.scrollIntoView({ block: "center" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when opening
  }, [open]);

  // Reset highlight to the best match while searching.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- keep highlight on the first match
    if (open && q) setActive(0);
  }, [q, open]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(optId(active))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, open]);

  // Close on outside press.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
     
  }, [open]);

  const move = (to: number) => setActive(Math.min(Math.max(to, 0), Math.max(opts.length - 1, 0)));

  const onListKey = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        move(active + 1);
        return;
      case "ArrowUp":
        e.preventDefault();
        move(active - 1);
        return;
      case "PageDown":
        e.preventDefault();
        move(active + 8);
        return;
      case "PageUp":
        e.preventDefault();
        move(active - 8);
        return;
      case "Home":
      case "End":
        if (canSearch) return; // let the search box move its caret
        e.preventDefault();
        move(e.key === "Home" ? 0 : opts.length - 1);
        return;
      case "Enter":
        e.preventDefault();
        if (opts[active]) choose(opts[active].option);
        return;
      case "Escape":
        e.preventDefault();
        e.stopPropagation();
        close();
        return;
      case "Tab":
        close(false);
        return;
    }
    // Type-to-jump when there's no search box.
    if (!canSearch && e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const t = typeahead.current;
      const now = Date.now();
      t.buf = now - t.at > 600 ? e.key.toLowerCase() : t.buf + e.key.toLowerCase();
      t.at = now;
      const hit = opts.findIndex((r) => norm(r.option.label).startsWith(t.buf));
      if (hit >= 0) move(hit);
    }
  };

  const onTriggerKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openList();
    } else if (canSearch && e.key.length === 1 && /\S/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      openList(e.key);
    }
  };

  return (
    <div ref={rootRef} className={`f-select${className ? ` ${className}` : ""}`}>
      <button
        ref={triggerRef}
        id={f.id}
        type="button"
        role="combobox"
        className="f-control f-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={rest["aria-label"] ? undefined : `${f.labelId} ${f.id}`}
        aria-label={rest["aria-label"]}
        aria-describedby={f.describedBy}
        aria-invalid={f.invalid || undefined}
        data-empty={selected ? undefined : ""}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onTriggerKey}
      >
        <span className="f-trigger-value">
          {selected ? (
            renderValue ? (
              renderValue(selected)
            ) : (
              <>
                {selected.leading}
                <span className="f-tx">{selected.label}</span>
              </>
            )
          ) : (
            <span className="f-tx">{placeholder}</span>
          )}
        </span>
        <Chevron />
      </button>

      {open && (
        <div className="f-pop" data-side={place.side} data-align={place.align}>
          {canSearch && (
            <div className="f-search">
              <SearchIcon />
              <input
                ref={searchRef}
                type="text"
                value={query}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder.replace(/…$/, "")}
                aria-controls={listId}
                aria-activedescendant={opts[active] ? optId(active) : undefined}
                aria-autocomplete="list"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onListKey}
              />
              {query && (
                <button type="button" className="f-search-clear" aria-label="Clear search" onClick={() => (setQuery(""), searchRef.current?.focus())}>
                  ×
                </button>
              )}
            </div>
          )}
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            tabIndex={canSearch ? -1 : 0}
            aria-labelledby={f.labelId}
            aria-activedescendant={!canSearch && opts[active] ? optId(active) : undefined}
            className="f-list"
            onKeyDown={canSearch ? undefined : onListKey}
          >
            {rows.map((r, n) =>
              r.kind === "group" ? (
                <li key={`g${n}`} role="presentation" className="f-group">
                  {r.label}
                </li>
              ) : (
                <li
                  key={`${r.index}-${r.option.value}`}
                  id={optId(r.index)}
                  role="option"
                  aria-selected={r.option.value === value}
                  data-active={r.index === active ? "" : undefined}
                  className="f-opt"
                  onPointerMove={() => r.index !== active && setActive(r.index)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(r.option)}
                >
                  {r.option.leading}
                  <span className="f-opt-label">
                    <Highlight text={r.option.label} query={q} />
                  </span>
                  {r.option.detail && <span className="f-opt-detail">{r.option.detail}</span>}
                  {r.option.value === value ? <Check /> : <span className="f-opt-check" />}
                </li>
              ),
            )}
            {!opts.length && (
              <li role="presentation" className="f-empty">
                No matches for “{query.trim()}”
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- Ready-made pickers */

export function CurrencySelect({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  const options = useMemo<SelectOption[]>(
    () =>
      currencies().map((c) => ({
        value: c.code,
        label: c.name,
        detail: c.symbol !== c.code ? c.symbol : undefined,
        leading: <span className="f-code">{c.code}</span>,
        keywords: c.code,
      })),
    [],
  );
  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      popular={POPULAR_CURRENCIES}
      allLabel="All currencies"
      searchPlaceholder="Search currency or code…"
      renderValue={(o) => (
        <>
          {o.leading}
          <span className="f-tx">{o.label}</span>
        </>
      )}
    />
  );
}

export function CountrySelect({ value, onChange, placeholder = "Select country" }: { value: string; onChange: (code: string) => void; placeholder?: string }) {
  const options = useMemo<SelectOption[]>(
    () =>
      countries().map((c) => ({
        value: c.code,
        label: c.name,
        detail: c.code,
        leading: (
          <span className="f-flag" aria-hidden="true">
            {c.flag}
          </span>
        ),
        keywords: c.aliases,
      })),
    [],
  );
  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      popular={POPULAR_COUNTRIES}
      allLabel="All countries"
      emptyLabel="No country"
      placeholder={placeholder}
      searchPlaceholder="Search country…"
    />
  );
}
