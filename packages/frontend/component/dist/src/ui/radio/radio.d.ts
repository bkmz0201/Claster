import type { RadioProps } from './types';
/**
 * ### Radio button group (Tabs)
 * A tab-like radio button group
 *
 * #### 1. Basic usage with fixed width
 * ```tsx
 * <RadioGroup
 *   width={300}
 *   value={value}
 *   onChange={setValue}
 *   items={['Radio 1', 'Radio 2, Longer', 'S3']}
 *  />
 * ```
 *
 * #### 2. Dynamic width
 * ```tsx
 * <RadioGroup
 *   width="100%"
 *   value={value}
 *   onChange={setValue}
 *   items={['Radio 1', 'Radio 2, Longer', 'S3']}
 * />
 * ```
 *
 * #### 3. `ReactNode` as label
 * ```tsx
 * const [value, setValue] = useState('ai');
 * const items: RadioItem[] = [
 *   {
 *     value: 'ai',
 *     label: <AiIcon width={20} height={20} />,
 *     style: { width: 28 },
 *   },
 *   {
 *     value: 'calendar',
 *     label: <TodayIcon width={20} height={20} />,
 *     style: { width: 28 },
 *   },
 * ];
 * return (
 *   <RadioGroup
 *     value={value}
 *     onChange={setValue}
 *     items={items}
 *     padding={4}
 *     borderRadius={12}
 *     gap={8}
 *   />
 * );
 * ```
 */
export declare const RadioGroup: import("react").NamedExoticComponent<RadioProps>;
//# sourceMappingURL=radio.d.ts.map