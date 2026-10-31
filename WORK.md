# TCQ Website Changes: Work Tracker

Source: `Website Changes.pdf` review notes (7 pages). The numbers match the sections of that document.

**Status:** `[ ]` to do · `[x]` done · `[N]` waiting on Nisha · `[A]` needs a photo or asset from the team

Work order: design system first, then loading screen and homepage, layout, page-wise changes, content, and finally interaction polish.

## Ask Nisha

Parked until the official files arrive. Nothing here gets worked around with a recreated logo.

- [N] 1.2 Official logo and brand name as a PNG. Send Nisha the required dimensions first.
- [N] 1.2 Use that one asset everywhere the branding appears, with correct proportions and no distortion
- [N] 2.2 Replace the logo image with the approved version; no extra text below it
- [N] 3.2 Top-left homepage logo: correct thickness, matches the official asset
- [N] 6.4 Bottom-left footer logo: official PNG, slightly larger, not distorted

## 1. Branding and typography

- [x] 1.1 All numbers use Outfit: event numbers, section numbers, loading percentage, labels, counters
- [x] 1.3 Navigation tabs: remove the blur; smooth hover, no layout shift, clear active state
- [x] 1.4 / 7.2 Replace the yellow background with a softer cream, consistent on every page
- [x] 1.5 Circular logo: decorative badge removed; the logo is near-black on cream and white on dark. Final colours follow the official file from Nisha
- [x] 1.6 / 2.3 "What is" bold, "The Curiosity Quotient?" italic, better colours and contrast

## 2. Page content and images

- [x] 2.1 "Who is TCQ?" title image is clear, without excess blur or distortion
- [A] 2.4 "How to Name It?" uses the thumbnail shared in the group. The file isn't on this machine; add it to `src/assets/wings/collabs/how-to-name-it/` and set it as the first photo in `wingsData.js`
- [x] 2.5 "Hysterically Speaking": now shows all 5 available photographs; any more need new files
- [x] 2.6 "Typical Chennai Quiz": add three aligned images of uniform size
- [x] 2.7 "Five Wings, One Curiosity": tighter, balanced line spacing
- [x] 2.8 Resume Building: landscape image without unnecessary cropping
- [A] 2.9 Anti-Drug Awareness: no change until new photographs arrive
- [x] 2.10 Uniform event thumbnails: size, aspect ratio, cropping, spacing

## 3. Loading screen and homepage

- [x] 3.1 Cats drawn as a single line, not a double line
- [x] 3.1 Loading animation doesn't continue or restart after 100%; percentage stays in sync; no flicker
- [x] 3.3 Circular cat illustration: solid colour only, accent orange, no double outline
- [x] 3.4 / 7.3 Cursor: thinner line, smaller dot, matches the cat illustration, doesn't block clicks
- [x] 3.5 Remove the animated homepage stars
- [x] 3.6 Change the colour of the "What if every question…" tagline
- [x] 3.7 Remove the arrow from the "Explore TCQ" button

## 4. Page-wise changes

Dot-and-line element: a small dot leading a thin line, echoing the cursor. It replaces dashes and arrows throughout.

- [x] 4.1 What is TCQ: dot-and-line on "About TCQ"; remove the top-right circular badge
- [x] 4.2 Who is Behind: rounded corners on The Roots and The Vision, same radius
- [x] 4.3 Journey: remove the gradient dash under designations; replace the rocket with dot-and-line
- [x] 4.4 Five Wings: line spacing; dot-and-line on "What We Do"; cards use a simple dot instead of the sparkle; "Scroll to Explore" in that case with dot-and-line instead of an arrow
- [x] 4.5 Quizzes: no highlight on the tag; dot-and-line before it; consistent "Explore Images" button; event numbers aligned to the top of titles; dot-and-line instead of the top-right arrow
- [x] 4.6 Circles: same as Quizzes
- [x] 4.7 Collabs: same as Quizzes
- [x] 4.8 Writes: same as Quizzes; fix cropped content; remove the number on "From Our Substack" and reposition it
- [x] 4.9 Teaches: same as Quizzes
- [x] 4.10 Make Curiosity Social: remove the top-right number and arrow
- [x] 4.11 What Could We Make Together: dot-and-line on the eyebrow; one style across the heading; "Get in Touch" outlined like "Explore Images"

## 5. Brands

- [x] Dot-and-line before "Our Partners"
- [x] Reviewed the order of the main text and subtext: kept heading first (see decisions)
- [x] Remove the duplicate logos (large grid and rolling strip)
- [x] Dot-and-line instead of the arrow after "Let's Talk"
- [x] "Want to be on this wall next?" uses Outfit

## 6. Final section

- [x] 6.1 Remove the "Open for Collaborations" tab
- [x] 6.2 "Start a Conversation": outlined like "Explore Images", clear hover
- [x] 6.3 Marquee: orange dot instead of the sparkle
- [x] 6.4 Remove the text below the footer logo (the logo itself is with Nisha, above)
- [x] 6.5 Social icons: correct hover, always fully visible, not covered by the cursor
- [x] 6.6 CQ + PQ element: move it somewhere clearly visible

## 7. General

- [x] 7.1 All content visible in the viewport at different sizes; no cropping or hiding fixed heights
- [x] 7.4 Smoother zig-zag reel scrolling, no jumps or layout shifts

## Design decisions to approve

The notes say these need approval. They're implemented with the choice below so the site can be reviewed, and each is easy to change.

| Item | Choice made |
|---|---|
| New background colour | Warm ivory `#FAF3E6`, with `#F2E7D3` as the alternate tint. Set in `src/index.css` and the component styles |
| Rocket replaced by dot-and-line | Done: an orange dot leads the drawn timeline line |
| Swap Brands text and subtext | Not swapped: a sentence above the heading weakens the hierarchy |

## Notes

- **Text orange:** `#A85A36` was added for small orange text on cream, because `#D58F6B` is hard to read there.
- **Thumbnails:** event photos are now the same square size, so portrait photos are cropped. Writes article cards stay 4:5 so their text stays readable.
- **Formula:** the site says "CQ + PQ > IQ" and the notes say "= IQ". Left as `>`; please confirm.
- **Eyebrow wording:** the site says "Collaborate With TCQ" and the notes say "Collaborate With Us". Left unchanged.
- **Resume Building:** three photos were stored sideways and have been rotated upright.
- **Lit Arcade:** its light logo was nearly invisible, so its tile is now dark.
