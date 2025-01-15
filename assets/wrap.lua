function wrap(el,side)
    w=string.gsub(el.content[1].content[1].attributes.width,'px','')
    h=string.gsub(el.content[1].content[1].attributes.height,'px','')
    l=tostring(math.floor(h/96/.233+3))
return {
       pandoc.RawInline('latex',' \\begin{wrapfigure}['..l..']{'..side..'}{'..tostring(tonumber(w)/96+.2)..'in}'),
       pandoc.RawInline('latex','\\centering \\includesvg[width='..tostring(tonumber(w)/96)..'in]{'..el.content[1].content[1].src..'}'),
       pandoc.RawInline('latex','\\caption{'..el.caption.long[1].content[1].text..'}\\label{'..el.identifier..'}'),
       pandoc.RawInline('latex',' \\end{wrapfigure}')
}
end

function Figure(el)
  if el.content[1].content[1].src=='images/Top.svg'
  then 
    return wrap(el,'o')
  end
  if 
   el.content[1].content[1].src=='images/stack.pdf' or
   el.content[1].content[1].src=='images/lg.pdf'  
  then 
    return wrap(el,'i')
  end
  return el
end
