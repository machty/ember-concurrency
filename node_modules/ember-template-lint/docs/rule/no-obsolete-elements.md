## no-obsolete-elements

Some elements are entirely obsolete and must not be used by authors. 

This rule forbids the use of obsolete elements.

### Examples

This rule **forbids** the following:

```hbs
<applet></applet>
<acronym></acronym>
<bgsound></bgsound>
<dir></dir>
<frame></frame>
<frameset></frameset>
<noframes></noframes>
<isindex></isindex>
<keygen>
<listing></listing>
<menuitem></menuitem>
<nextid></nextid>
<noembed></noembed>
<plaintext></plaintext>
<rb></rb>
<rtc></rtc>
<strike></strike>
<xmp></xmp>
<basefont></basefont>
<big></big>
<blink></blink>
<center></center>
<font></font>
<marquee></marquee>
<multicol></multicol>
<nobr></nobr>
<spacer></spacer>
<tt></tt>
```

This rule **allows** anything that is not an obsolete element.

### Migration

* replace any use of these elements with the appropriate updated element or a `div` element.

### References

* [no-obsolete-elements](https://html.spec.whatwg.org/multipage/obsolete.html#non-conforming-features)
* [Failure of Success Criterion 2.2.2 due to using the blink element](https://www.w3.org/TR/WCAG20-TECHS/failures.html#F47)
