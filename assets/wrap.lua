function wrap(el,side)
  f = assert(io.open(el.content[1].content[1].src, "r"))
  t = f:read("*all")
  f:close()
  s=el.content[1].content[1].attributes.s
  w=string.match(t, "width=\"(%d*.-%d-)pt\"")*s
  h=string.match(t, "height=\"(%d*.-%d-)pt\"")*s
  --<svg width="511.6499938964844" height="396.04998779296875"
  --print(el.content[1].content[1].attributes)
    --l=el.content[1].content[1].attributes.l
  
  l=tostring(math.floor(h/96/.14+3))
    print(l)
    print(h)
    print(w)
return {
       pandoc.RawInline('latex','\\begin{wrapfigure}['..l..']{'..side..'}{0px}'),
       pandoc.RawInline('latex','\\centering \\includesvg[scale='..s..']{'..el.content[1].content[1].src..'}'),
       pandoc.RawInline('latex','\\caption{'..el.caption.long[1].content[1].text..'}\\label{'..el.identifier..'}'),
       pandoc.RawInline('latex','\\end{wrapfigure}')
      --pandoc.RawInline('latex','\\afterpage{\\clearpage}')
}
end

function Figure(el)
  if el.content[1].content[1].src=='images/Top.svg' or
   el.content[1].content[1].src=='images/toptext.svg'  
  then 
    return wrap(el,'o')
  end
  if 
   el.content[1].content[1].src=='images/stack.pdf' or
   el.content[1].content[1].src=='images/toptext.svgx'  
  then 
    return wrap(el,'i')
  end
  return el
end
