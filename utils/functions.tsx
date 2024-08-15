import scrollIntoView from "scroll-into-view";

export function scrollToCenter(
  element: HTMLElement,
  check = true,
  scrolling: boolean,
  lyricsType?: string
) {
  const scrollOptions = {
    time: 500,
    ease: (n: number) => n,
    maxSynchronousAlignments: 1,
  };

  if (!element) return;
  if (element.classList.contains("highlight"))
    switch (lyricsType) {
      case "TEXT_SYNCED":
        element = element.parentElement!;
        break;
      case "NOT_SYNCED":
        return;
    }

  if (!check) return scrollIntoView(element, scrollOptions);

  const { clientHeight } = document.body;
  const { bottom, top } = element.getBoundingClientRect();

  if (
    bottom >= -50 &&
    top - clientHeight <= 50 &&
    !scrolling &&
    !document.getSelection()?.toString()
  )
    scrollIntoView(element, scrollOptions);
}
export function getElementIndex(element: HTMLElement) {
  if (element) {
    const index = [...element.classList].find((name) =>
      name.startsWith("index")
    );

    return index ? +index.replace("index-", "") : null;
  }
}
