import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import BlogItem from '@components/blogItem/blogItem'

import { getBlogItems, getLinkedAsset } from '../../../core/blog/selectors';
import Link from '@web/components/link/link';
import { dateCaculator } from '../../../utils';

export const BlogView: FC = () => {
  const blogItems = useSelector(getBlogItems);
  const linkedAssetItems = useSelector(getLinkedAsset) ?? [];

  return (
    <div className='mt-5 p-5 md:p-10 bg-white rounded-lg shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur text-base'>
      <h1 className='text-2xl pb-3.5 mb-2 md:7 text-left font-bold text-gray-600 font-harman'>Newest blog posts</h1>
      
      <div className='py-1 inset-x-1 -bottom-px h-px bg-gradient-to-r from-zinc-100 to-teal-zinc'></div>

      <main className='mt-10'>
        {blogItems.map(item => {

        const asset = linkedAssetItems.find(assetItem => assetItem.sys.id === item?.fields?.image?.[0]?.sys?.id);
        
        const dateUpdatedCaculatorResult = dateCaculator(new Date(item?.sys?.updatedAt));
        const dateCreatedCaculatorResult = dateCaculator(new Date(item?.sys?.createdAt));

        // Difference in days

        const isOriginal = new Date(item?.sys?.updatedAt) === new Date(item?.sys?.createdAt);

        const finalDate = isOriginal ? <span>Created {dateUpdatedCaculatorResult.unit} <b>{dateUpdatedCaculatorResult.unitType} ago</b></span> : <span>Updated <b>{dateUpdatedCaculatorResult.unit} {dateUpdatedCaculatorResult.unitType} ago</b> and published <b>{dateCreatedCaculatorResult.unit} {dateCreatedCaculatorResult.unitType} ago</b></span>

          return (
            <article className='animate-fade-down animate-once animate-delay-100 animate-ease-in-out animate-normal'>
              <h1 className='text-2xl pb-3.5 font-bold font-harman'>
                <Link to={`/blog/${item.fields.slug}`}>
                  {item?.fields?.title ?? ''}
                </Link>
              </h1>
              <div className='pb-3.5'>
                {item?.fields?.summary}
              </div>
              <div className='pb-3.5'>
              {item?.metadata?.tags.map(tag => <Link to={`/blog/tags/${tag?.sys?.id}`}><span className='mt-10 relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'>{tag?.sys?.id}</span></Link>)}
              </div>
              <div className='text-sm text-gray-500'>
                {finalDate}
              </div>
              <div className='flex justify-center items-center'>
                <img src={asset?.fields?.file?.url} className='m-10 p-10'/>
              </div>
              <div>
                {item?.fields &&
                  <BlogItem assets={linkedAssetItems} content={item.fields} limit={5} />
                }
              </div>
            </article>
          );
        })}
      </main>
    </div>
  );
};

export default BlogView;
