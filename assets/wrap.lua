function wrap(el,side)
    s=el.content[1].content[1].attributes.s
    l=el.content[1].content[1].attributes.l
return {
       pandoc.RawInline('latex','\\begin{wrapfigure}['..l..']{'..side..'}{0px}'),
       pandoc.RawInline('latex','\\centering \\includesvg[scale='..s..']{'..el.content[1].content[1].src..'}'),
       pandoc.RawInline('latex','\\caption{'..el.caption.long[1].content[1].text..'}\\label{'..el.identifier..'}'),
       pandoc.RawInline('latex',' \\end{wrapfigure}'),
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
